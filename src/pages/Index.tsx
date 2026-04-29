import { useMemo, useState } from "react";
import { MessageCircle, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface BallotPaper {
  id: string;
  title: string;
  area: string;
  roleSummary: string;
  candidates: { name: string; party: string }[];
  sources: { label: string; href: string }[];
}

const openingMessage =
  "Hello, I’m Pollie. I can help you understand what’s on your ballot. I won’t tell you who to vote for, but I can explain what each vote is for, who the candidates are, and where the information comes from. What’s your postcode?";

const polliePrompt = `You are Pollie, a neutral UK civic information assistant.
Your purpose is to help people understand what they are voting for in upcoming UK elections.
You are warm, calm, plain-speaking and impartial.

You must:
- use British English
- explain political structures clearly
- distinguish between county, borough, district, unitary, parish, mayoral, PCC, devolved and general elections
- explain what each elected role typically controls
- list candidates neutrally
- cite official or trusted sources
- say when information may be incomplete
- encourage users to check their poll card or local council website for final confirmation

You must not:
- tell users who to vote for
- recommend a party or candidate
- rank candidates
- infer which party best matches the user
- campaign, persuade or favour one side
- use emotionally loaded political language

When asked for advice on who to vote for, respond:
“I can’t tell you who to vote for, but I can help you compare candidates neutrally. For example, we can look at their stated priorities, party manifestos, local responsibilities, and public information side by side.”

When data is unavailable, respond:
“I couldn’t find confirmed election information for that postcode yet. Your poll card and local council website are the best sources to confirm this.”`;

const mockBallots: BallotPaper[] = [
  {
    id: "hcc-fareham-portchester",
    title: "Hampshire County Council – Fareham Portchester division",
    area: "County election",
    roleSummary:
      "County councillors typically decide services such as schools, social care, roads, and libraries across the county.",
    candidates: [
      { name: "Candidate A", party: "Conservative Party" },
      { name: "Candidate B", party: "Labour Party" },
      { name: "Candidate C", party: "Liberal Democrats" },
      { name: "Candidate D", party: "Green Party" },
    ],
    sources: [
      { label: "Hampshire County Council election information", href: "https://www.hants.gov.uk" },
      { label: "Electoral Commission guidance", href: "https://www.electoralcommission.org.uk" },
    ],
  },
  {
    id: "fbc-portchester-castle",
    title: "Fareham Borough Council – Portchester Castle ward",
    area: "Borough election",
    roleSummary:
      "Borough councillors typically oversee local planning, housing, refuse collection, and leisure services within the borough.",
    candidates: [
      { name: "Candidate A", party: "Conservative Party" },
      { name: "Candidate B", party: "Labour Party" },
      { name: "Candidate C", party: "Liberal Democrats" },
      { name: "Candidate D", party: "Green Party" },
    ],
    sources: [
      { label: "Fareham Borough Council elections", href: "https://www.fareham.gov.uk" },
      { label: "GOV.UK voting and elections", href: "https://www.gov.uk/browse/citizenship/voting" },
    ],
  },
];

const isUkPostcode = (value: string) => {
  const trimmed = value.trim().toUpperCase();
  const regex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/;
  return regex.test(trimmed);
};

const Index = () => {
  const [postcode, setPostcode] = useState("");
  const [submittedPostcode, setSubmittedPostcode] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const ballots = useMemo(() => {
    if (!submittedPostcode) return [];
    if (submittedPostcode.replace(/\s/g, "").toUpperCase() === "PO169AA") {
      return mockBallots;
    }
    return [];
  }, [submittedPostcode]);

  const handlePostcodeSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isUkPostcode(postcode)) {
      setValidationError("Please enter a valid UK postcode (for example, PO16 9AA).");
      return;
    }

    setValidationError(null);
    setSubmittedPostcode(postcode.trim().toUpperCase());
  };

  return (
    <div className="min-h-screen bg-background px-6 py-8 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.8fr_1fr]">
        <Card className="flex min-h-[78vh] flex-col rounded-3xl border-border shadow-sm">
          <CardHeader className="border-b border-border">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-2xl">Pollie</CardTitle>
                <CardDescription>AI civic guide · chat-first prototype</CardDescription>
              </div>
            </div>
          </CardHeader>

          <ScrollArea className="flex-1 px-6 py-5">
            <div className="space-y-4">
              <div className="max-w-3xl rounded-2xl bg-secondary/50 p-4 text-sm leading-6 text-foreground">
                {openingMessage}
              </div>

              {submittedPostcode && (
                <div className="flex justify-end">
                  <div className="rounded-2xl bg-primary px-4 py-3 text-sm text-primary-foreground">
                    {submittedPostcode}
                  </div>
                </div>
              )}

              {submittedPostcode && ballots.length > 0 && (
                <div className="space-y-4 rounded-2xl bg-secondary/50 p-4">
                  <p className="text-sm leading-6">
                    Thanks. I’ve found two upcoming ballots for <strong>{submittedPostcode}</strong>. I’ve listed them below with a plain-English summary, neutral candidate list, and source links. Please check your poll card and local council website for final confirmation.
                  </p>
                </div>
              )}

              {submittedPostcode && ballots.length === 0 && (
                <div className="rounded-2xl bg-secondary/50 p-4 text-sm leading-6">
                  I couldn’t find confirmed election information for that postcode yet. Your poll card and local council website are the best sources to confirm this.
                </div>
              )}
            </div>
          </ScrollArea>

          <form onSubmit={handlePostcodeSubmit} className="border-t border-border p-4">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                value={postcode}
                onChange={(event) => setPostcode(event.target.value)}
                placeholder="Enter your postcode"
                className="rounded-full"
              />
              <Button type="submit" className="rounded-full sm:px-6">
                Check ballot
              </Button>
            </div>
            {validationError && <p className="mt-2 text-sm text-destructive">{validationError}</p>}
          </form>
        </Card>

        <div className="space-y-4">
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg">Product target</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground">
              <p>
                Build a chat-first civic guide for UK voters that explains upcoming ballots by postcode, keeps language plain and non-partisan, and shows clear source trails.
              </p>
              <p>
                Success signal: a voter can understand each ballot paper and candidate list in under three minutes without receiving voting advice.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg">Implementation plan (mock-first)</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
                <li>Lock persona and safety rules into a reusable Pollie system prompt.</li>
                <li>Create postcode validation and mock election lookup for PO16 9AA.</li>
                <li>Render ballot cards with role summaries, neutral candidates, and source links.</li>
                <li>Add follow-up prompts that ask users what they want to understand next.</li>
                <li>Swap mock lookup for live election APIs/council feeds behind same interface.</li>
              </ol>
            </CardContent>
          </Card>

          {ballots.map((ballot) => (
            <Card key={ballot.id} className="rounded-3xl">
              <CardHeader>
                <CardTitle className="text-base leading-6">{ballot.title}</CardTitle>
                <CardDescription>{ballot.area}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p className="text-muted-foreground">{ballot.roleSummary}</p>
                <div>
                  <p className="mb-2 font-medium">Candidates</p>
                  <div className="flex flex-wrap gap-2">
                    {ballot.candidates.map((candidate) => (
                      <Badge key={`${ballot.id}-${candidate.name}`} variant="secondary" className="rounded-full px-3 py-1">
                        {candidate.name} – {candidate.party}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 font-medium">Sources</p>
                  <ul className="space-y-1">
                    {ballot.sources.map((source) => (
                      <li key={source.href}>
                        <a
                          href={source.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          <MapPin className="h-3.5 w-3.5" />
                          {source.label}
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="rounded-3xl border-dashed">
            <CardHeader>
              <CardTitle className="text-lg">Pollie prompt (first pass)</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="max-h-64 overflow-auto whitespace-pre-wrap text-xs leading-5 text-muted-foreground">
                {polliePrompt}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
