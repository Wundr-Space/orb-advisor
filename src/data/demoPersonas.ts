export interface DemoPersona {
  id: string;
  name: string;
  currentRole: string;
  yearsExperience: number;
  careerGoal: string;
  personality: string;
  commonResponses: {
    askingName: string;
    greeting: string;
    analyticalThinking: string;
    resilience: string;
    leadership: string;
    creativeThinking: string;
    customerService: string;
    technology: string;
    learning: string;
    teamwork: string;
    problemSolving: string;
    communication: string;
    general: string[];
  };
}

export const demoPersonas: DemoPersona[] = [
  {
    id: "postal-clerk",
    name: "Marcus",
    currentRole: "Postal Service Clerk",
    yearsExperience: 12,
    careerGoal: "logistics coordinator or supply chain analyst",
    personality: "Reliable and methodical, with strong organizational skills",
    commonResponses: {
      askingName: "I'm Marcus. Nice to meet you!",
      greeting: "I've been working at the post office for 12 years, mostly handling package sorting and customer window services. I'm looking to transition into something with more growth potential, maybe logistics or supply chain work.",
      analyticalThinking: "Every day I had to analyze delivery routes and package volumes to optimize our sorting process. When we got a surge of holiday packages, I developed a system to prioritize time-sensitive mail that reduced our backlog by 40%.",
      resilience: "When USPS went through major restructuring, our team was cut in half but the workload stayed the same. I adapted by cross-training on multiple positions and helped train newer staff to handle the increased demand.",
      leadership: "I became the informal go-to person for complex situations. When we had a major system outage, I organized the team to switch to manual processing and kept operations running smoothly for three days.",
      creativeThinking: "I noticed customers were confused about shipping options, so I created a simple visual guide showing price vs. speed tradeoffs. Management actually adopted it across our region.",
      customerService: "I handled hundreds of customer interactions daily, from upset customers with lost packages to helping elderly residents understand new services. I learned to stay calm and find solutions even in difficult situations.",
      technology: "I'm comfortable with our tracking systems and database software. I've also taught myself Excel to track performance metrics for our branch, which management started using for reports.",
      learning: "I recently completed an online course in supply chain fundamentals because I wanted to understand the bigger picture of logistics. I'm also learning about inventory management systems.",
      teamwork: "Our morning sorting team was like a well-oiled machine. I coordinated with carriers, window clerks, and management to ensure everything flowed smoothly. Communication was key to avoiding bottlenecks.",
      problemSolving: "When packages were getting misrouted, I traced the issue to a labeling problem and worked with our supervisor to implement a double-check system that reduced errors by 60%.",
      communication: "I regularly communicated with customers, team members, and management. I learned to adjust my communication style - being detailed with supervisors and simple with confused customers.",
      general: [
        "In my role, attention to detail was critical - one wrong sort could mean a package going across the country instead of across town.",
        "I've always been someone who takes initiative. If I see a problem, I try to fix it rather than waiting for someone else.",
        "Working at the post office taught me the importance of consistency and reliability. People depend on us every single day."
      ]
    }
  },
  {
    id: "bank-teller",
    name: "Sarah",
    currentRole: "Bank Teller",
    yearsExperience: 8,
    careerGoal: "financial advisor or client relationship manager",
    personality: "Personable and detail-oriented, with strong numerical skills",
    commonResponses: {
      askingName: "My name's Sarah. Lovely to chat with you!",
      greeting: "I've been a bank teller for 8 years, and I really enjoy helping customers with their finances. But I'm looking to move into a role where I can do more comprehensive financial advising rather than just transactions.",
      analyticalThinking: "I analyze customer accounts daily to identify discrepancies and potential fraud. Last year, I caught a pattern of suspicious transactions that led to uncovering a fraud ring affecting multiple accounts.",
      resilience: "When our bank merged with another institution, everything changed - new systems, new policies, new customers. I was one of the first to get certified on the new platform and helped train my colleagues through the transition.",
      leadership: "I was asked to mentor new tellers, and I developed a training program that reduced their onboarding time from 6 weeks to 4 weeks. I still check in with my mentees regularly.",
      creativeThinking: "I noticed many customers were confused about our product options, so I created a simple comparison chart. It increased our cross-sell rate and was adopted by other branches.",
      customerService: "I've handled everything from helping first-time account openers to calming down customers who were victims of identity theft. Building trust and making people feel heard is something I'm really good at.",
      technology: "I use multiple banking platforms daily and adapted quickly when we transitioned to a new core system. I've also helped elderly customers learn our mobile banking app.",
      learning: "I'm currently studying for my Series 6 license because I want to expand into investment products. I also take every training opportunity the bank offers.",
      teamwork: "We work closely as a team to manage the queue and handle complex transactions. When it's busy, we communicate constantly to make sure customers aren't waiting too long.",
      problemSolving: "A customer once came in with a very complex estate issue involving multiple accounts. I worked with our back office for two weeks to untangle everything and saved the family from a potential legal dispute.",
      communication: "I explain complex financial concepts in simple terms every day. Whether it's helping someone understand compound interest or explaining why a transaction was declined, clear communication is essential.",
      general: [
        "Accuracy is everything in banking. One decimal point can mean thousands of dollars, so I've developed really strong attention to detail.",
        "I've always been fascinated by personal finance. I help friends and family with their budgets all the time.",
        "The most rewarding part of my job is when I can help someone achieve a financial goal, like saving enough for their first home."
      ]
    }
  },
  {
    id: "data-entry-clerk",
    name: "Jamie",
    currentRole: "Data Entry Clerk",
    yearsExperience: 3,
    careerGoal: "data analyst or database administrator",
    personality: "Precise and focused, with strong pattern recognition",
    commonResponses: {
      askingName: "I'm Jamie! Thanks for asking.",
      greeting: "I've been doing data entry for about 3 years now. I'm fast and accurate, but I want to do more than just inputting data - I want to actually analyze it and help make decisions.",
      analyticalThinking: "Even though my job is technically just entering data, I started noticing patterns - like which vendors had the most errors in their submissions. I created a report that helped the team identify and address quality issues.",
      resilience: "Our department went through a major software migration while I was still relatively new. I stayed late to learn the new system and became one of the fastest adapters on the team.",
      leadership: "I don't have a formal leadership role, but when we get new temps, I'm always the one who trains them. I created a quick reference guide that's now used for all new hires.",
      creativeThinking: "I developed keyboard shortcuts and macros that increased my processing speed by 35%. I shared these with my team, and our whole department became more efficient.",
      customerService: "I work with internal customers - other departments that need their data entered. I make sure to communicate clearly about timelines and flag any issues I notice in their submissions.",
      technology: "I'm very comfortable with databases, Excel, and data processing tools. I've taught myself basic SQL in my spare time because I want to understand what happens to the data after I enter it.",
      learning: "I'm taking online courses in data analytics and visualization. I've already built a few practice dashboards using our department's data, with approval from my manager.",
      teamwork: "Data entry can be solitary, but we coordinate closely when there are big projects. I help balance workloads and jump in when colleagues are overwhelmed.",
      problemSolving: "I noticed we were getting a lot of duplicate entries, so I created a validation checklist that reduced duplicates by 80%. It saved hours of cleanup work each week.",
      communication: "I document my processes thoroughly so others can follow them. When I find data issues, I communicate them clearly to the source department with specific examples.",
      general: [
        "I can type 85 words per minute with 99.5% accuracy. Speed is important, but accuracy is non-negotiable.",
        "I actually find patterns in data really fascinating. What looks like boring numbers to others tells stories to me.",
        "I'm the kind of person who loves organizing things. My spreadsheets are always perfectly formatted."
      ]
    }
  },
  {
    id: "cashier",
    name: "Taylor",
    currentRole: "Retail Cashier",
    yearsExperience: 5,
    careerGoal: "retail management or customer success specialist",
    personality: "Friendly and efficient, with strong people skills",
    commonResponses: {
      askingName: "I'm Taylor. Great to meet you!",
      greeting: "I've worked as a cashier at a large retail store for 5 years. I love interacting with customers, but I'm ready for a role with more responsibility and growth opportunities.",
      analyticalThinking: "I track my till accuracy religiously and analyze my own error patterns. I realized most of my mistakes happened during the lunch rush, so I developed a double-check system for busy periods.",
      resilience: "During the pandemic, everything about my job changed overnight - new safety protocols, supply shortages, stressed customers. I adapted quickly and helped calm anxious shoppers.",
      leadership: "I often take charge during busy shifts, directing customer flow and helping newer cashiers when they get stuck. The managers started calling me the 'unofficial supervisor.'",
      creativeThinking: "I suggested reorganizing our checkout area to speed up the bagging process. The store implemented my idea, and our throughput increased noticeably.",
      customerService: "I've dealt with every type of customer - happy, angry, confused, in a hurry. I know how to read people and adjust my approach. I've turned many unhappy customers into regulars.",
      technology: "I'm proficient with POS systems, inventory scanners, and self-checkout assistance. I'm usually the one who troubleshoots when the register acts up.",
      learning: "I've been learning about retail management through online courses. I'm also studying for a customer service certification to formalize my skills.",
      teamwork: "We work as a team during busy periods, covering breaks and helping each other with long lines. Good communication is essential - especially calling for backup before lines get too long.",
      problemSolving: "When a customer's coupon wouldn't scan and they were getting upset, I calmly troubleshooted the issue, found an alternative solution, and turned a potential complaint into a compliment to my manager.",
      communication: "I communicate with customers all day - reading their mood, explaining policies, and making small talk. I've learned to be clear but friendly, even when delivering bad news.",
      general: [
        "I can accurately count back change in my head faster than the register calculates it. It's a skill I'm proud of.",
        "I remember regular customers and their preferences. People really appreciate when you remember them.",
        "Even on the busiest days, I keep my station clean and organized. It just makes everything run smoother."
      ]
    }
  },
  {
    id: "admin-assistant",
    name: "Rachel",
    currentRole: "Administrative Assistant",
    yearsExperience: 7,
    careerGoal: "office manager or project coordinator",
    personality: "Organized and proactive, with excellent multitasking abilities",
    commonResponses: {
      askingName: "I'm Rachel. Pleasure to meet you!",
      greeting: "I've been an administrative assistant for 7 years, supporting multiple executives. I basically keep the office running, but I'm ready to take on more strategic responsibilities.",
      analyticalThinking: "I manage complex schedules and budgets, always analyzing the best use of everyone's time. I created a meeting efficiency report that helped executives reclaim 10 hours per week.",
      resilience: "Our company went through a major reorganization, and I suddenly had to support twice as many people with the same hours. I reprioritized ruthlessly and automated what I could.",
      leadership: "I coordinate with vendors, other assistants, and department heads daily. I've trained three new assistants who've all been promoted. People come to me for guidance.",
      creativeThinking: "I redesigned our filing system to be searchable and logical. What used to take 20 minutes to find now takes 30 seconds. I love finding better ways to do things.",
      customerService: "I'm often the first point of contact for clients and visitors. I make everyone feel welcome while professionally handling their needs.",
      technology: "I'm expert-level in Office 365, particularly Outlook, Excel, and PowerPoint. I've also managed our team's SharePoint site and taught colleagues to use collaboration tools.",
      learning: "I completed a project management certification last year and I'm currently learning about business analysis because I want to understand operations at a deeper level.",
      teamwork: "I work with literally everyone in the company - executives, staff, vendors, clients. Coordinating between all these groups requires constant communication and flexibility.",
      problemSolving: "When a critical presentation file got corrupted hours before a board meeting, I recovered an earlier version, coordinated with IT, and had the exec prepped with 15 minutes to spare.",
      communication: "Clear communication is the core of my job - writing emails, taking meeting notes, conveying messages between executives. I've learned to be concise and professional.",
      general: [
        "I live by my calendar and to-do lists. If it's not written down, it doesn't exist.",
        "Anticipating needs is my superpower. I can tell when my boss needs coffee before they know it themselves.",
        "Discretion is essential in my role. I handle sensitive information daily and maintain strict confidentiality."
      ]
    }
  },
  {
    id: "printing-worker",
    name: "Dave",
    currentRole: "Printing Press Operator",
    yearsExperience: 15,
    careerGoal: "production manager or quality control specialist",
    personality: "Meticulous and mechanical, with strong technical aptitude",
    commonResponses: {
      askingName: "Name's Dave. Good to meet you!",
      greeting: "I've been running printing presses for 15 years. I know the industry is changing with digital, so I'm looking to leverage my production experience in a role with more longevity.",
      analyticalThinking: "I constantly analyze print quality, adjusting for temperature, humidity, and paper stock. I can spot a color shift before the calibration tools catch it.",
      resilience: "The print industry has shrunk dramatically. I've adapted by learning digital printing, large format, and specialty materials. I refuse to become obsolete.",
      leadership: "I've supervised overnight print runs with crews of up to 6 people. I'm responsible for scheduling, quality, and safety during those shifts.",
      creativeThinking: "When a client wanted a special finish we didn't normally offer, I experimented with different techniques and developed a new capability that brought in several new accounts.",
      customerService: "I work closely with clients on color matching and proof approval. I've learned to translate technical printing terminology into language they understand.",
      technology: "Modern presses are computer-controlled. I manage pre-press software, RIP systems, and production workflows. I also troubleshoot mechanical and electrical issues.",
      learning: "I've been taking courses in production management and Lean Six Sigma principles. I want to understand how to optimize entire operations, not just my press.",
      teamwork: "Print production requires tight coordination - pre-press, press operators, bindery, shipping. I communicate constantly to keep jobs flowing smoothly.",
      problemSolving: "When a rush job came in with poorly prepared files, I worked with the design team to fix the issues in pre-press while adjusting the press schedule to still meet the deadline.",
      communication: "I document every job's specifications and any issues encountered. Clear handoff communication between shifts prevents costly reprints.",
      general: [
        "There's a craft to printing that machines can't replicate. I take pride in producing quality work.",
        "Safety is paramount around heavy machinery. I've maintained a perfect safety record throughout my career.",
        "I've run thousands of jobs and can estimate production time and costs very accurately."
      ]
    }
  },
  {
    id: "bookkeeper",
    name: "Linda",
    currentRole: "Bookkeeping and Payroll Clerk",
    yearsExperience: 10,
    careerGoal: "accounting manager or financial operations analyst",
    personality: "Precise and trustworthy, with strong financial acumen",
    commonResponses: {
      askingName: "I'm Linda. Thanks for having me!",
      greeting: "I've handled bookkeeping and payroll for 10 years across several small businesses. I'm ready to move into a role where I can do more strategic financial work.",
      analyticalThinking: "I analyze financial statements monthly, spotting trends and anomalies. I once identified a billing error that had been costing the company $2,000 per month for years.",
      resilience: "When COVID hit, I had to transition all our financial processes to remote work in a week. I also managed PPP loans and all the additional reporting requirements.",
      leadership: "I'm often the only person who truly understands our finances, so I've learned to communicate complex information to non-financial managers and guide their decisions.",
      creativeThinking: "I developed a cash flow forecasting model that helped our owner make better timing decisions on major purchases. It was just Excel, but it made a real impact.",
      customerService: "I'm the person employees come to with payroll questions. I handle sensitive salary information with discretion and always help people understand their paystubs and benefits.",
      technology: "I'm proficient in QuickBooks, Sage, ADP, and Excel. I've also learned to use data visualization tools to make financial reports more accessible to non-accountants.",
      learning: "I'm currently pursuing my accounting certification to formalize my knowledge. I also take webinars on tax law changes to stay current.",
      teamwork: "I coordinate with HR, operations, and vendors to ensure accurate financial records. Month-end close requires tight collaboration with multiple departments.",
      problemSolving: "When our accounts didn't balance, I spent two weeks tracing every transaction until I found a systematic categorization error in how we were recording sales tax.",
      communication: "I present financial reports to owners and managers, breaking down complex numbers into actionable insights. Clear communication builds trust with stakeholders.",
      general: [
        "I take the responsibility of handling other people's pay very seriously. Errors aren't just numbers - they affect people's lives.",
        "I'm naturally detail-oriented. I actually enjoy reconciling accounts because finding that last penny is satisfying.",
        "Confidentiality is essential in my role. I know everyone's salary and keep it completely private."
      ]
    }
  },
  {
    id: "stock-clerk",
    name: "Kevin",
    currentRole: "Material-Recording and Stock-Keeping Clerk",
    yearsExperience: 6,
    careerGoal: "inventory manager or procurement specialist",
    personality: "Systematic and observant, with strong organizational skills",
    commonResponses: {
      askingName: "Kevin here. Nice to meet you!",
      greeting: "I've been managing inventory and warehouse operations for 6 years. I want to move into a role where I can work on bigger-picture supply chain decisions.",
      analyticalThinking: "I analyze inventory levels daily, identifying trends and potential stockouts. I developed a reorder point system that reduced our emergency orders by 70%.",
      resilience: "When supply chain disruptions hit, I had to completely rethink our inventory strategy. I built relationships with backup suppliers and implemented a new buffer stock system.",
      leadership: "I supervise receiving and put-away operations, coordinating a small team to process incoming shipments efficiently. I'm responsible for training and scheduling.",
      creativeThinking: "I reorganized our warehouse layout based on picking frequency, which reduced our average pick time by 25%. Sometimes efficiency improvements don't require new technology.",
      customerService: "I work with internal customers - sales, production, management - making sure they have the materials they need when they need them. Reliable inventory supports everyone.",
      technology: "I'm experienced with WMS systems, barcode scanners, and inventory management software. I've also used Excel extensively for analysis and reporting.",
      learning: "I'm studying for my APICS certification in production and inventory management. I want to understand best practices at a professional level.",
      teamwork: "Warehouse work is all about coordination - receiving, stocking, picking, shipping. Clear communication and mutual support are essential for smooth operations.",
      problemSolving: "When our cycle counts kept showing discrepancies, I implemented a root cause analysis process that identified where errors were occurring and reduced shrinkage by 40%.",
      communication: "I document every inventory movement and communicate clearly about stock levels. When there's a potential shortage, I alert the right people immediately.",
      general: [
        "I take pride in a well-organized warehouse. There's a place for everything and everything in its place.",
        "Accuracy in inventory management is crucial. A wrong count can mean lost sales or wasted money on excess stock.",
        "I've learned to anticipate seasonal patterns and prepare inventory levels accordingly."
      ]
    }
  },
  {
    id: "transport-attendant",
    name: "Maria",
    currentRole: "Transportation Attendant",
    yearsExperience: 9,
    careerGoal: "transportation coordinator or customer experience manager",
    personality: "Patient and attentive, with strong safety awareness",
    commonResponses: {
      askingName: "I'm Maria. Pleasure to meet you!",
      greeting: "I've worked as a transportation attendant for 9 years, mostly on intercity buses. I help passengers, ensure safety, and handle any issues that come up during trips.",
      analyticalThinking: "I observe passenger patterns and have suggested schedule adjustments that improved on-time performance. I also track and report recurring issues to help management make better decisions.",
      resilience: "I've handled everything from medical emergencies to difficult passengers to mechanical breakdowns. Staying calm under pressure and adapting quickly is essential in this job.",
      leadership: "During emergencies, passengers look to me for guidance. I've coordinated evacuations and managed crowd control. People trust me to keep them safe.",
      creativeThinking: "I suggested adding charging ports and improving seating announcements based on passenger feedback. Small improvements made a real difference in customer satisfaction scores.",
      customerService: "Customer service is the heart of my job. I help elderly passengers, families with kids, people with disabilities, and tourists. Every passenger should feel welcomed and assisted.",
      technology: "I use ticketing systems, communication radios, and customer feedback platforms. I also help passengers troubleshoot the WiFi and entertainment systems.",
      learning: "I've taken additional certifications in first aid, conflict resolution, and customer service. I want to be prepared for any situation.",
      teamwork: "I coordinate closely with drivers, dispatch, and station staff. Good communication ensures smooth departures, on-time arrivals, and quick resolution of issues.",
      problemSolving: "When we had an overbooking situation, I calmly reassigned seats, arranged compensation for inconvenienced passengers, and prevented what could have been an angry scene.",
      communication: "I make announcements, answer questions, and de-escalate conflicts. Clear, calm communication can prevent most problems from escalating.",
      general: [
        "Safety is my top priority. I do thorough checks before every trip and stay vigilant throughout.",
        "I've learned to read people quickly. I can often spot potential problems before they happen.",
        "The best part of my job is helping people - whether it's reuniting a child with their family or helping someone navigate an unfamiliar city."
      ]
    }
  },
  {
    id: "street-vendor",
    name: "Chris",
    currentRole: "Door-to-Door Sales Representative",
    yearsExperience: 4,
    careerGoal: "sales manager or business development representative",
    personality: "Persistent and personable, with strong persuasion skills",
    commonResponses: {
      askingName: "I'm Chris. Thanks for chatting with me!",
      greeting: "I've been in door-to-door sales for 4 years, selling everything from solar panels to home security. I'm ready to take my sales skills to a bigger stage.",
      analyticalThinking: "I analyze my territory constantly - which neighborhoods respond best, what times work, which pitches close. Data drives my strategy.",
      resilience: "I face rejection dozens of times a day. You have to have thick skin in this job. I've learned not to take it personally and keep pushing forward.",
      leadership: "I've trained new sales reps and often lead our team in performance. I share my successful techniques and help struggling teammates improve.",
      creativeThinking: "I developed a personalized pitch approach based on quickly reading each homeowner's priorities. My close rate improved 40% once I stopped using the standard script.",
      customerService: "Building trust quickly is essential. I follow up with customers, ensure they're satisfied, and get referrals. Happy customers are my best lead source.",
      technology: "I use CRM systems to track leads, GPS for route optimization, and tablets for presentations. I also leverage social media to research prospects.",
      learning: "I study sales techniques constantly - books, podcasts, training videos. The best salespeople never stop learning new approaches.",
      teamwork: "We share territory insights and what's working. When a teammate is struggling, we pair up to help them improve. A rising tide lifts all boats.",
      problemSolving: "When I hit a slump, I analyzed my recent pitches, identified what changed, and adjusted my approach. Being willing to self-critique is key to improvement.",
      communication: "I adjust my communication style to each customer - some want details, some want the bottom line. Reading people and adapting is my core skill.",
      general: [
        "I set daily and weekly goals and track my progress obsessively. Numbers don't lie.",
        "Rejection is just part of the game. Every 'no' gets me closer to a 'yes.'",
        "The freedom and earning potential of sales is what motivates me. Your income is directly tied to your effort."
      ]
    }
  },
  {
    id: "graphic-designer",
    name: "Alex",
    currentRole: "Graphic Designer",
    yearsExperience: 5,
    careerGoal: "UX designer or creative director",
    personality: "Creative and collaborative, with strong visual communication skills",
    commonResponses: {
      askingName: "I'm Alex. Great to connect with you!",
      greeting: "I've been a graphic designer for 5 years, doing everything from branding to marketing materials. I'm interested in moving toward UX design where I can solve more complex problems.",
      analyticalThinking: "Design isn't just about aesthetics - I analyze user needs, brand requirements, and market positioning. Every visual decision should be backed by strategic thinking.",
      resilience: "The creative field is full of rejection and revision. I've learned to separate my ego from my work and see feedback as a path to better solutions.",
      leadership: "I've led brand refresh projects and coordinated with photographers, copywriters, and developers. Creative leadership is about guiding a vision while respecting expertise.",
      creativeThinking: "Creativity is my job. I brainstorm multiple concepts, push beyond the obvious, and find unexpected solutions. My portfolio shows range and innovation.",
      customerService: "I work directly with clients to understand their vision and translate it visually. Managing expectations and communicating design decisions clearly is essential.",
      technology: "I'm expert in Adobe Creative Suite, Figma, and various prototyping tools. I also understand HTML/CSS enough to design feasibly and communicate with developers.",
      learning: "I'm learning UX research methods and interaction design principles. I've also been teaching myself motion graphics to expand my capabilities.",
      teamwork: "Design is collaborative. I work with marketing, product, and development teams constantly. Being able to give and receive feedback constructively is crucial.",
      problemSolving: "When a client's feedback seemed contradictory, I scheduled a discovery session to understand the underlying needs. We ended up with a solution that exceeded their expectations.",
      communication: "I present design concepts persuasively, explaining the reasoning behind decisions. Visual communication is my specialty, but verbal communication is equally important.",
      general: [
        "I believe good design is invisible - it just works without calling attention to itself.",
        "Deadlines are a fact of life. I've learned to manage time and prioritize effectively.",
        "I stay current with design trends but don't follow them blindly. Timeless design is about solving problems."
      ]
    }
  },
  {
    id: "claims-adjuster",
    name: "Patricia",
    currentRole: "Insurance Claims Adjuster",
    yearsExperience: 8,
    careerGoal: "risk analyst or claims manager",
    personality: "Investigative and fair, with strong analytical skills",
    commonResponses: {
      askingName: "Patricia. Nice to meet you!",
      greeting: "I've been adjusting insurance claims for 8 years, handling everything from auto accidents to property damage. I'm looking to move into a more strategic risk analysis role.",
      analyticalThinking: "Every claim requires investigation and analysis - reviewing evidence, interviewing parties, calculating damages. I've developed strong skills in synthesizing complex information to reach fair conclusions.",
      resilience: "Claims work means dealing with people at their worst moments. I've handled difficult, sometimes hostile claimants while maintaining professionalism and fairness.",
      leadership: "I mentor junior adjusters and help develop training materials. I also lead complex cases that require coordination with legal, medical experts, and special investigation units.",
      creativeThinking: "When standard investigation methods weren't working, I developed new approaches using social media research and data analysis that became department best practices.",
      customerService: "Even when delivering unfavorable decisions, I maintain empathy and clear communication. People may not like the outcome, but they should understand and feel heard.",
      technology: "I use claims management systems, damage estimation software, and data analytics tools. I've also embraced mobile tools for field investigations.",
      learning: "I'm studying for industry certifications and taking courses in data analytics. Understanding risk patterns at a deeper level is my goal.",
      teamwork: "Complex claims require collaboration with underwriting, legal, and external experts. I coordinate these resources effectively to reach accurate conclusions.",
      problemSolving: "I investigated a complex claim where the initial facts didn't add up. Through careful analysis, I uncovered information that completely changed the outcome - saving the company from a fraudulent payout.",
      communication: "I write detailed investigation reports and communicate decisions to claimants, agents, and attorneys. Clear, defensible communication is essential.",
      general: [
        "Fairness is paramount. I look at every claim objectively, whether it benefits the company or the claimant.",
        "Documentation is everything. A well-documented claim file tells a complete story.",
        "I've learned to trust my instincts when something doesn't seem right, then verify with evidence."
      ]
    }
  },
  {
    id: "legal-official",
    name: "Robert",
    currentRole: "Court Clerk",
    yearsExperience: 11,
    careerGoal: "court administrator or legal operations specialist",
    personality: "Procedural and impartial, with strong attention to detail",
    commonResponses: {
      askingName: "I'm Robert. Pleased to meet you!",
      greeting: "I've worked as a court clerk for 11 years, managing case files, supporting judges, and ensuring court procedures run smoothly. I'm interested in court administration.",
      analyticalThinking: "I analyze case files, legal documents, and procedural requirements constantly. Identifying what's needed for each case to proceed correctly requires careful attention.",
      resilience: "Courts deal with people in crisis - custody disputes, criminal cases, civil conflicts. I maintain composure and impartiality regardless of the emotional intensity.",
      leadership: "I train new clerks and coordinate workflow during high-volume periods. I'm also responsible for ensuring compliance with constantly changing court rules.",
      creativeThinking: "I proposed improvements to our case management workflow that reduced processing time by 30%. Within a formal system, there's always room for efficiency gains.",
      customerService: "I help attorneys, parties, and the public navigate court procedures. I can't give legal advice, but I can explain processes clearly and point people to resources.",
      technology: "I'm proficient in electronic case management systems, digital recording equipment, and court technology platforms. I've helped implement several system upgrades.",
      learning: "I'm studying court administration and public management. Understanding the bigger picture of judicial operations is important for advancement.",
      teamwork: "Court operations require coordination between judges, clerks, attorneys, bailiffs, and court reporters. Smooth collaboration keeps the docket moving.",
      problemSolving: "When a critical case file was misfiled, I systematically searched our records and recovered it before the hearing. Attention to detail prevented a potential mistrial.",
      communication: "I communicate court procedures, deadlines, and requirements to diverse audiences - from experienced attorneys to self-represented parties. Clarity prevents errors.",
      general: [
        "Accuracy is non-negotiable in legal work. A wrong date or missing signature can have serious consequences.",
        "Impartiality is fundamental. I treat every case and every person with equal respect regardless of the matter.",
        "I've processed thousands of cases and understand the importance of each one to the people involved."
      ]
    }
  },
  {
    id: "legal-secretary",
    name: "Jennifer",
    currentRole: "Legal Secretary",
    yearsExperience: 9,
    careerGoal: "paralegal or legal operations manager",
    personality: "Meticulous and confidential, with strong organizational skills",
    commonResponses: {
      askingName: "I'm Jennifer. Lovely to meet you!",
      greeting: "I've been a legal secretary for 9 years at a mid-sized law firm. I handle everything from document preparation to client communication. I'm interested in becoming a paralegal.",
      analyticalThinking: "I review and organize complex legal documents, identifying discrepancies and ensuring accuracy. I've caught errors in contracts that could have caused significant problems.",
      resilience: "Legal work involves tight deadlines and high pressure. I've stayed late many nights to meet filing deadlines and managed multiple urgent projects simultaneously.",
      leadership: "I train new administrative staff and have improved our document management systems. I'm often the person everyone comes to for procedural questions.",
      creativeThinking: "I developed templates and checklists that streamlined our contract review process, reducing preparation time by 40% while improving consistency.",
      customerService: "I'm often clients' first point of contact. I handle sensitive situations with discretion, keep clients informed, and ensure they feel valued.",
      technology: "I'm expert in legal document management, court filing systems, and legal research databases. I also maintain our calendaring and deadline tracking systems.",
      learning: "I'm currently taking paralegal courses to formalize my legal knowledge. I also attend CLE programs to stay current with legal developments.",
      teamwork: "I support multiple attorneys and coordinate with other staff to ensure smooth operations. Legal work requires constant communication and collaboration.",
      problemSolving: "When we discovered a filing deadline had been miscalculated, I quickly researched the rules, coordinated emergency efforts, and we filed on time.",
      communication: "I draft correspondence, communicate with courts and opposing counsel, and translate complex legal information for clients. Professional communication is essential.",
      general: [
        "Confidentiality is sacred in legal work. I handle extremely sensitive information and maintain strict discretion.",
        "Organization is everything. I manage multiple cases, deadlines, and documents simultaneously.",
        "I've learned to anticipate what attorneys need and have materials ready before they ask."
      ]
    }
  },
  {
    id: "call-center",
    name: "Michael",
    currentRole: "Call Center Representative",
    yearsExperience: 4,
    careerGoal: "customer success manager or team lead",
    personality: "Patient and solution-oriented, with strong communication skills",
    commonResponses: {
      askingName: "I'm Michael. Thanks for speaking with me!",
      greeting: "I've worked in a call center for 4 years, handling customer inquiries and complaints. I'm looking to move into a role where I can have deeper relationships with customers.",
      analyticalThinking: "I analyze call patterns and customer feedback to identify common issues. I've suggested process improvements that reduced repeat calls by 25%.",
      resilience: "I handle difficult calls every day - angry customers, complex problems, unreasonable demands. I've developed the ability to stay calm and focused no matter what.",
      leadership: "I mentor new representatives and help with quality coaching. I'm often asked to handle escalated calls because of my ability to de-escalate situations.",
      creativeThinking: "When our script wasn't addressing a common issue, I developed a new approach that resolved customer concerns faster. It was adopted by the whole team.",
      customerService: "Customer service is my entire job. I've learned to listen actively, empathize genuinely, and find solutions quickly. Every customer should feel heard and helped.",
      technology: "I'm proficient in CRM systems, telephony software, and knowledge bases. I can navigate multiple systems quickly while maintaining conversation flow.",
      learning: "I'm studying customer success methodologies and business communication. I want to understand customer relationships at a strategic level.",
      teamwork: "We support each other constantly - sharing knowledge, covering during breaks, and collaborating on difficult cases. Team culture makes a huge difference.",
      problemSolving: "A customer had a billing issue that had bounced between departments for months. I took ownership, coordinated with multiple teams, and finally resolved it permanently.",
      communication: "I adapt my communication style to each caller - some need facts, some need empathy, some need both. Clear, patient communication is my core skill.",
      general: [
        "I genuinely care about helping people. It's not just a job - I want every customer to have a good experience.",
        "Patience is essential. Some calls take time, and rushing creates more problems than it solves.",
        "I track my own metrics and constantly work to improve. Self-awareness drives performance."
      ]
    }
  }
];

export const getRandomPersona = (): DemoPersona => {
  const randomIndex = Math.floor(Math.random() * demoPersonas.length);
  return demoPersonas[randomIndex];
};
