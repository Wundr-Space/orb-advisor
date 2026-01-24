import { useEffect, useRef, useMemo, useState } from 'react';
import * as d3 from 'd3';

export interface SkillMatch {
  skillId: string;
  skillName: string;
  userLevel: number;
  matchScore: number;
  color: string;
  category: string;
  isMatched: boolean;
}

interface ProfileBlobChartProps {
  skillMatches: SkillMatch[];
  matchPercentage?: number;
}

// Category-based color palettes - vibrant and distinct
const categoryColors: Record<string, string[]> = {
  'cognitive': [
    'hsl(280, 75%, 60%)',
    'hsl(260, 70%, 55%)',
    'hsl(300, 65%, 58%)',
  ],
  'technology': [
    'hsl(195, 85%, 50%)',
    'hsl(210, 80%, 55%)',
    'hsl(180, 70%, 48%)',
  ],
  'self-efficacy': [
    'hsl(45, 90%, 55%)',
    'hsl(35, 85%, 52%)',
    'hsl(55, 80%, 50%)',
  ],
  'working-with-others': [
    'hsl(340, 75%, 55%)',
    'hsl(320, 70%, 52%)',
    'hsl(0, 70%, 58%)',
  ],
  'management': [
    'hsl(145, 70%, 45%)',
    'hsl(160, 65%, 48%)',
    'hsl(120, 55%, 50%)',
  ],
  'physical': [
    'hsl(25, 80%, 55%)',
    'hsl(15, 75%, 52%)',
    'hsl(40, 70%, 50%)',
  ],
};

export const getSkillColor = (skillId: string, category: string, index: number): string => {
  const palette = categoryColors[category] || categoryColors['cognitive'];
  const hash = skillId.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return palette[(hash + index) % palette.length];
};

// Generate organic blob path
const generateBlobPath = (radius: number, morphPhase: number): string => {
  const numPoints = 12;
  const angleStep = (Math.PI * 2) / numPoints;
  const points: [number, number][] = [];

  for (let i = 0; i < numPoints; i++) {
    const angle = i * angleStep;
    const variation1 = Math.sin(morphPhase * 1.2 + angle * 3) * 0.25;
    const variation2 = Math.cos(morphPhase * 2 + angle * 2) * 0.18;
    const variation3 = Math.sin(morphPhase * 0.8 + angle * 4) * 0.12;
    
    const totalVariation = variation1 + variation2 + variation3;
    const r = radius * (0.85 + Math.abs(totalVariation) * 0.35);
    
    points.push([Math.cos(angle) * r, Math.sin(angle) * r]);
  }

  let path = `M ${points[0][0]} ${points[0][1]}`;
  
  for (let i = 0; i < points.length; i++) {
    const current = points[i];
    const next = points[(i + 1) % points.length];
    const prev = points[(i - 1 + points.length) % points.length];
    const afterNext = points[(i + 2) % points.length];
    
    const tension = 0.35;
    const cp1x = current[0] + (next[0] - prev[0]) * tension;
    const cp1y = current[1] + (next[1] - prev[1]) * tension;
    const cp2x = next[0] - (afterNext[0] - current[0]) * tension;
    const cp2y = next[1] - (afterNext[1] - current[1]) * tension;
    
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next[0]} ${next[1]}`;
  }
  
  return path + ' Z';
};

export function ProfileBlobChart({ skillMatches, matchPercentage = 50 }: ProfileBlobChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const animationRef = useRef<number>();
  const simulationDataRef = useRef<any[]>([]);
  const [dimensions, setDimensions] = useState({ width: 200, height: 160 });

  // Measure container
  useEffect(() => {
    if (!containerRef.current) return;
    
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) {
        setDimensions({ width: Math.floor(width), height: Math.floor(height) });
      }
    });
    
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Initialize blob data
  const blobConfig = useMemo(() => {
    if (skillMatches.length === 0) return [];
    const { width, height } = dimensions;
    
    const containerArea = width * height;
    const maxTotalArea = containerArea * 0.85;
    const minTotalArea = containerArea * 0.05;
    const targetTotalArea = minTotalArea + (maxTotalArea - minTotalArea) * (matchPercentage / 100);
    
    const sortedMatches = [...skillMatches].sort((a, b) => {
      if (a.isMatched !== b.isMatched) return b.isMatched ? 1 : -1;
      return b.userLevel - a.userLevel;
    });
    
    const weights = sortedMatches.map(match => {
      const proficiencyWeight = match.userLevel / 100;
      if (match.isMatched) {
        return proficiencyWeight * 3 + 0.5;
      }
      return proficiencyWeight * 0.3 + 0.1;
    });
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    
    return sortedMatches.map((match, index) => {
      const areaShare = totalWeight > 0 
        ? (weights[index] / totalWeight) * targetTotalArea 
        : targetTotalArea / sortedMatches.length;
      const baseRadius = Math.sqrt(areaShare / Math.PI);
      
      const maxRadius = matchPercentage > 80 ? 50 : 40;
      const clampedRadius = Math.max(6, Math.min(baseRadius, maxRadius));
      
      const cols = Math.ceil(Math.sqrt(sortedMatches.length));
      const col = index % cols;
      const row = Math.floor(index / cols);
      const spacingX = width / (cols + 1);
      const startY = height - clampedRadius - 8;
      
      return {
        ...match,
        color: getSkillColor(match.skillId, match.category, index),
        baseRadius: clampedRadius,
        initialX: spacingX * (col + 1) + (Math.random() - 0.5) * 15,
        initialY: startY - row * (clampedRadius * 1.3),
        morphSpeed: 0.004 + Math.random() * 0.003,
      };
    });
  }, [skillMatches, dimensions, matchPercentage]);

  useEffect(() => {
    if (!svgRef.current || blobConfig.length === 0) return;
    
    const { width, height } = dimensions;
    if (width === 0 || height === 0) return;

    simulationDataRef.current = blobConfig.map(config => ({
      ...config,
      x: config.initialX,
      y: config.initialY,
      vx: 0,
      vy: 0,
      morphPhase: Math.random() * Math.PI * 2,
    }));

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create tooltip
    const tooltip = d3.select('body').selectAll('.blob-tooltip').data([0])
      .join('div')
      .attr('class', 'blob-tooltip')
      .style('position', 'fixed')
      .style('background', 'hsl(var(--card))')
      .style('color', 'hsl(var(--card-foreground))')
      .style('padding', '6px 10px')
      .style('border-radius', '8px')
      .style('font-size', '11px')
      .style('pointer-events', 'none')
      .style('opacity', '0')
      .style('z-index', '1000')
      .style('box-shadow', '0 2px 8px rgba(0,0,0,0.1)')
      .style('border', '1px solid hsl(var(--border))')
      .style('transition', 'opacity 0.15s');

    // Physics constants
    const gravity = 0.08;
    const friction = 0.85;
    const bounce = 0.15;
    const padding = 10;
    const overlapAllowance = 0.15;

    // Create blob groups
    const blobs = svg.selectAll('.blob')
      .data(simulationDataRef.current)
      .join('g')
      .attr('class', 'blob')
      .style('cursor', 'pointer');

    // Add paths to blobs
    blobs.each(function(d: any) {
      const blob = d3.select(this);
      blob.append('path')
        .style('fill', d.color)
        .style('opacity', d.isMatched ? 0.85 : 0.5)
        .attr('d', generateBlobPath(d.baseRadius, d.morphPhase));
    });

    // Mouse events
    blobs.on('mouseenter', function(event: MouseEvent, d: any) {
      d3.select(this).select('path')
        .style('opacity', 0.95);
      
      tooltip
        .style('opacity', '1')
        .html(`<strong>${d.skillName}</strong><br>${d.isMatched ? '✓ Matched' : 'Not required'}<br>${d.matchScore.toFixed(0)}% proficiency`)
        .style('left', `${event.clientX + 12}px`)
        .style('top', `${event.clientY - 8}px`);
    })
    .on('mousemove', function(event: MouseEvent) {
      tooltip
        .style('left', `${event.clientX + 12}px`)
        .style('top', `${event.clientY - 8}px`);
    })
    .on('mouseleave', function(event: MouseEvent, d: any) {
      d3.select(this).select('path')
        .style('opacity', d.isMatched ? 0.85 : 0.5);
      tooltip.style('opacity', '0');
    });

    // Animation loop with gravity physics
    const animate = () => {
      const simData = simulationDataRef.current;
      
      simData.forEach((d: any) => {
        d.vy += gravity;
        d.vx *= friction;
        d.vy *= friction;
        d.x += d.vx;
        d.y += d.vy;
        d.morphPhase += d.morphSpeed;
        
        const boundaryRadius = d.baseRadius * 0.75;
        const minX = padding + boundaryRadius;
        const maxX = width - padding - boundaryRadius;
        const minY = padding + boundaryRadius;
        const maxY = height - padding - boundaryRadius;
        
        if (d.y > maxY) {
          d.y = maxY;
          d.vy = -Math.abs(d.vy) * bounce;
        }
        if (d.x < minX) {
          d.x = minX;
          d.vx = Math.abs(d.vx) * bounce;
        }
        if (d.x > maxX) {
          d.x = maxX;
          d.vx = -Math.abs(d.vx) * bounce;
        }
        if (d.y < minY) {
          d.y = minY;
          d.vy = Math.abs(d.vy) * 0.2;
        }
      });
      
      // Collision detection
      for (let i = 0; i < simData.length; i++) {
        for (let j = i + 1; j < simData.length; j++) {
          const a = simData[i];
          const b = simData[j];
          
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = (a.baseRadius + b.baseRadius) * (1 - overlapAllowance);
          
          if (dist < minDist && dist > 0) {
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = (minDist - dist) * 0.4;
            
            a.x -= nx * overlap;
            a.y -= ny * overlap;
            b.x += nx * overlap;
            b.y += ny * overlap;
            
            const dvn = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
            if (dvn > 0) {
              a.vx -= dvn * nx * 0.3;
              a.vy -= dvn * ny * 0.3;
              b.vx += dvn * nx * 0.3;
              b.vy += dvn * ny * 0.3;
            }
          }
        }
      }
      
      // Final clamp
      simData.forEach((d: any) => {
        const boundaryRadius = d.baseRadius * 0.75;
        d.x = Math.max(padding + boundaryRadius, Math.min(width - padding - boundaryRadius, d.x));
        d.y = Math.max(padding + boundaryRadius, Math.min(height - padding - boundaryRadius, d.y));
      });
      
      blobs
        .attr('transform', (d: any, i: number) => `translate(${simData[i].x}, ${simData[i].y})`)
        .select('path')
        .attr('d', (d: any, i: number) => generateBlobPath(simData[i].baseRadius, simData[i].morphPhase));
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      tooltip.style('opacity', '0');
    };
  }, [blobConfig, dimensions]);

  if (skillMatches.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
        No matching skills
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg 
        ref={svgRef} 
        className="absolute inset-0 w-full h-full"
        style={{ background: 'hsl(var(--muted) / 0.3)' }}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="xMidYMid meet"
      />
    </div>
  );
}

// Helper function to calculate skill matches for a job
export function calculateSkillMatchesForJob(
  userSkills: { name: string; score: number | null }[],
  jobSkills: string[],
  matchedSkillNames: string[] = []
): SkillMatch[] {
  const matches: SkillMatch[] = [];
  
  // Map skill names to categories based on common patterns
  const getCategoryForSkill = (skillName: string): string => {
    const lower = skillName.toLowerCase();
    if (lower.includes('technology') || lower.includes('programming') || lower.includes('ai') || lower.includes('cyber') || lower.includes('network')) {
      return 'technology';
    }
    if (lower.includes('leadership') || lower.includes('management') || lower.includes('talent')) {
      return 'management';
    }
    if (lower.includes('empathy') || lower.includes('service') || lower.includes('teaching')) {
      return 'working-with-others';
    }
    if (lower.includes('resilience') || lower.includes('motivation') || lower.includes('curiosity')) {
      return 'self-efficacy';
    }
    if (lower.includes('manual') || lower.includes('dexterity') || lower.includes('sensory')) {
      return 'physical';
    }
    return 'cognitive';
  };
  
  userSkills.forEach((skill, index) => {
    if (skill.score === null) return;
    
    const isMatched = matchedSkillNames.includes(skill.name) || jobSkills.includes(skill.name);
    const category = getCategoryForSkill(skill.name);
    const userLevel = (skill.score / 5) * 100; // Convert 1-5 to 0-100
    
    matches.push({
      skillId: skill.name.toLowerCase().replace(/\s+/g, '-'),
      skillName: skill.name,
      userLevel,
      matchScore: userLevel,
      color: getSkillColor(skill.name.toLowerCase().replace(/\s+/g, '-'), category, index),
      category,
      isMatched,
    });
  });
  
  // Sort: matched skills first, then by score
  return matches
    .sort((a, b) => {
      if (a.isMatched !== b.isMatched) return a.isMatched ? -1 : 1;
      return b.matchScore - a.matchScore;
    })
    .slice(0, 8);
}
