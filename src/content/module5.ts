import type { Module } from "../types/content";

export const module5: Module = {
  id: "5",
  title: "FinOps for GenAI",
  subtitle: "Bedrock, SageMaker & AI Cost Management",
  description:
    "Master cost optimization strategies for generative AI and machine learning workloads on AWS, covering Bedrock, SageMaker, GPU instances, and managed AI services.",
  icon: "Sparkles",
  sections: [
    {
      id: "genai-cost-landscape",
      title: "The GenAI Cost Landscape",
      estimatedMinutes: 14,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Why AI Costs Are Fundamentally Different",
        },
        {
          type: "paragraph",
          text: "Traditional cloud cost models scale predictably: more VMs, more cost. Generative AI breaks this assumption. Costs scale with **token volume**, **prompt design**, **model choice**, and **inference pattern** — none of which are visible from infrastructure dashboards. A single poorly-written system prompt deployed across a high-traffic chatbot can add $50,000/month in wasted tokens. This is the FinOps challenge unique to AI: the cost driver is inside the software, not the infrastructure.",
        },
        {
          type: "heading",
          level: 3,
          text: "Non-Linear Scaling and Token Economics",
        },
        {
          type: "paragraph",
          text: "Token costs compound in non-obvious ways. A RAG pipeline that retrieves 5 document chunks, each 500 tokens, and prepends a 300-token system prompt, sends 2,800 tokens of context before the user's question even arrives. At Claude 3 Opus pricing ($0.015/1K input tokens), that context alone costs $0.042 **per query**. At 100,000 daily queries, that is $4,200/day — $1.5M/year — just for the static context. Optimizing context length is not a developer nicety; it is a financial imperative.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Prompt Inflation Is Invisible in Standard Dashboards",
          text: "AWS Cost Explorer shows spend by service, not by prompt. Without custom CloudWatch metrics tracking InputTokenCount and OutputTokenCount per application, you cannot distinguish between 'the model is expensive' and 'our prompts are bloated.' Instrument token tracking from day one.",
        },
        {
          type: "heading",
          level: 3,
          text: "Model Size vs Cost Tradeoffs",
        },
        {
          type: "paragraph",
          text: "Frontier models like Claude 3 Opus or GPT-4 cost 60x more per token than lightweight models like Claude 3 Haiku. Yet for many production tasks — classification, extraction, summarization of short documents — the quality difference is negligible. The mistake most teams make is defaulting to the most capable model during development and never revisiting the choice before production launch.",
        },
        {
          type: "table",
          headers: [
            "Scenario",
            "Optimal Model Tier",
            "Annual Cost Estimate (100K queries/day)",
          ],
          rows: [
            ["Email intent classification", "Haiku / Titan Lite", "~$9,000"],
            [
              "Customer support Q&A with RAG",
              "Haiku or Sonnet",
              "~$55,000–$180,000",
            ],
            ["Legal document analysis", "Sonnet or Opus", "~$1.1M–$5.5M"],
            ["Code generation (complex)", "Sonnet 3.5", "~$1.1M"],
            ["Data extraction from invoices", "Haiku", "~$9,000"],
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "The FinOps for AI Maturity Model",
        },
        {
          type: "paragraph",
          text: "The Cloud FinOps Foundation's maturity model (Crawl/Walk/Run) applies directly to AI spend. Most teams start at **Crawl**: no token instrumentation, default model choice, no budget alerts. **Walk** teams add per-application token tracking, model routing for simple tasks, and monthly spend reviews. **Run** teams operate AI unit economics dashboards (cost per inference, cost per active user, cost per correct answer) and automate guardrails that enforce spending limits in real time.",
        },
        {
          type: "numbered-list",
          items: [
            "**Crawl:** Default model, no token metrics, monthly bill surprises",
            "**Walk:** Token tracking per app, model selection policy, budget alerts on Bedrock/SageMaker",
            "**Run:** Unit economics dashboard, automated guardrails, per-team showback, model routing layer",
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Common Cost Shock Patterns",
        },
        {
          type: "bullet-list",
          items: [
            "**Prompt inflation:** System prompts that grow organically with feature additions — 300 tokens becomes 2,000 tokens over 6 months",
            "**Embedding at scale:** Processing 10M product descriptions through an embedding model at $0.0001/1K tokens costs $1,000 — but re-embedding unchanged documents nightly multiplies that to $30K/month",
            "**RAG pipeline costs:** Each query retrieves N chunks, embedding the query + storing/retrieving vectors all incur costs beyond the LLM call itself",
            "**Output length creep:** Allowing the model to respond with unbounded output length; a 2,000-token response costs 8x a 250-token response",
            "**Development vs production parity:** Teams that test against Opus in development and forget to switch to Haiku before launch",
            "**Agentic loops:** Multi-step agents that invoke the model 10–30 times per user request multiply costs by the same factor",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Calculate Your Token Budget Before Launch",
          text: "Before any AI feature ships, calculate: (avg input tokens) x (avg output tokens) x (daily query volume) x (model price/1K) = daily AI spend. Build this into your launch checklist alongside latency and error rate targets.",
        },
      ],
      flashcards: [
        {
          id: "m5-genai-cost-landscape-01",
          moduleId: "5",
          front:
            "Why does a RAG pipeline cost significantly more per query than a simple LLM call?",
          back: "A RAG pipeline incurs multiple cost layers per query: (1) embedding the user query through an embedding model, (2) vector store retrieval compute, (3) prepending retrieved document chunks (typically 1,000–5,000 tokens) as context in the LLM prompt, and (4) the LLM generation itself. The retrieved context alone can dwarf the cost of the actual question, especially with frontier models.",
          tags: ["rag", "tokens", "cost-landscape"],
        },
        {
          id: "m5-genai-cost-landscape-02",
          moduleId: "5",
          front: "What is 'prompt inflation' and why is it a FinOps concern?",
          back: "Prompt inflation is the gradual growth of system prompts as developers add new instructions, examples, and guardrails over time. A prompt that starts at 200 tokens can reach 2,000+ tokens after several feature iterations. Since every call pays for the full prompt, inflation multiplies cost across all invocations and is invisible without per-call token instrumentation.",
          tags: ["prompt-engineering", "tokens", "cost-landscape"],
        },
        {
          id: "m5-genai-cost-landscape-03",
          moduleId: "5",
          front:
            "Describe the three stages of the FinOps for AI maturity model.",
          back: "**Crawl:** No token instrumentation, default model choice, reactive to monthly bill surprises. **Walk:** Per-application token tracking in CloudWatch, explicit model selection policy, budget alerts on AI services. **Run:** AI unit economics dashboard (cost per inference, cost per active user), automated budget guardrails that restrict spending in real time, model routing layer that picks the cheapest model adequate for each task.",
          tags: ["maturity-model", "finops", "cost-landscape"],
        },
        {
          id: "m5-genai-cost-landscape-04",
          moduleId: "5",
          front:
            "How do agentic AI architectures multiply costs compared to single-turn LLM calls?",
          back: "Agentic loops invoke the LLM multiple times per user request — a ReAct agent solving a multi-step problem may call the model 10–30 times. Each intermediate step includes the full conversation history as context, which grows with each turn. This means cost scales super-linearly with the number of agent steps and the complexity of the task, making cost estimation and guardrails critical before deploying agentic systems.",
          tags: ["agents", "tokens", "cost-landscape"],
        },
      ],
    },
    {
      id: "bedrock-cost",
      title: "Amazon Bedrock Pricing Deep Dive",
      estimatedMinutes: 16,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "On-Demand Token Pricing by Model",
        },
        {
          type: "paragraph",
          text: "Amazon Bedrock charges separately for input tokens (the prompt) and output tokens (the generated response). Output tokens are consistently more expensive than input tokens because generation is computationally heavier than prompt processing. The price spread across models is enormous — Claude 3 Opus costs 60x more per input token than Claude 3 Haiku — making model selection the single most impactful cost decision in any Bedrock deployment.",
        },
        {
          type: "table",
          headers: [
            "Model",
            "Input (per 1K tokens)",
            "Output (per 1K tokens)",
            "Relative Cost vs Haiku",
          ],
          rows: [
            ["Claude 3 Haiku", "$0.00025", "$0.00125", "1x (baseline)"],
            ["Claude 3.5 Haiku", "$0.00080", "$0.00400", "3.2x"],
            ["Claude 3 Sonnet", "$0.00300", "$0.01500", "12x"],
            ["Claude 3.5 Sonnet", "$0.00300", "$0.01500", "12x"],
            ["Claude 3 Opus", "$0.01500", "$0.07500", "60x"],
            ["Amazon Titan Text Lite", "$0.00015", "$0.00020", "0.6x"],
            ["Amazon Titan Text Express", "$0.00080", "$0.00240", "3.2x"],
            ["Llama 3.1 70B (Meta)", "$0.00072", "$0.00072", "~3x"],
            ["Mistral Large", "$0.00400", "$0.01200", "16x"],
          ],
        },
        {
          type: "callout",
          variant: "important",
          title: "Real Example: Chatbot at 100K Daily Users",
          text: "A customer service chatbot with 100K daily conversations, each averaging 500 input tokens + 200 output tokens: on Claude 3 Haiku, that is $12.50 input + $25.00 output = **$37.50/day ($13,688/year)**. On Claude 3 Opus, the same workload costs **$750/day ($273,750/year)**. Model selection alone is a $260K annual decision.",
        },
        {
          type: "heading",
          level: 3,
          text: "Provisioned Throughput: Model Units and Break-Even",
        },
        {
          type: "paragraph",
          text: "Provisioned Throughput (PT) purchases **Model Units (MUs)** — each MU guarantees a fixed tokens-per-minute throughput. PT is billed per-hour whether used or not, making utilization the critical break-even variable. For Claude 3 Sonnet, 1 MU costs approximately $60/hour on a 1-month commitment. At on-demand pricing of $0.003/1K input tokens, you need to process roughly 20M input tokens/hour before PT becomes cheaper. At steady high utilization (80%+), PT typically saves 30–50%.",
        },
        {
          type: "table",
          headers: [
            "Commitment",
            "Discount vs On-Demand",
            "Break-Even Utilization",
            "Best For",
          ],
          rows: [
            ["On-Demand", "0%", "N/A", "Variable or development workloads"],
            [
              "PT 1-month",
              "~30%",
              "~65% utilization",
              "Proven steady workloads",
            ],
            [
              "PT 6-month",
              "~45%",
              "~50% utilization",
              "Long-term production systems",
            ],
            [
              "Batch Inference",
              "~50% off on-demand",
              "N/A (async)",
              "Offline processing jobs",
            ],
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Cross-Region Inference Profiles",
        },
        {
          type: "paragraph",
          text: "Cross-region inference profiles allow Bedrock to automatically route requests to the region with available model capacity. This is primarily a **reliability** feature — preventing throttling during regional capacity constraints — but it also provides modest cost benefits by reducing the need to over-provision Provisioned Throughput for peak headroom. Pricing remains the same as the source region; there is no cross-region surcharge for inference profiles.",
        },
        {
          type: "heading",
          level: 3,
          text: "Prompt Caching: Up to 90% Savings on Repeated Context",
        },
        {
          type: "paragraph",
          text: "Bedrock prompt caching stores the KV cache of a designated prefix (typically the system prompt) across API calls. Cached tokens are re-read at approximately **10% of the normal input token price**. For a RAG application with a 1,000-token system prompt sent 1M times/day: without caching, that is $0.25/day on Haiku. With caching, the same 1M reads cost $0.025/day — saving $82/year on Haiku. On Opus, the same caching saves $13,500/year for that single system prompt.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Cache Your Static Context — Always",
          text: "Any content that does not change between requests — system prompts, few-shot examples, document context loaded once per session — is a caching candidate. Structure prompts with the stable prefix first, dynamic user content last. This is the highest ROI optimization available in Bedrock.",
        },
        {
          type: "heading",
          level: 3,
          text: "Choosing the Right Model: Cost vs Quality Matrix",
        },
        {
          type: "paragraph",
          text: "Model selection should be driven by benchmarking your **specific task** rather than general capability rankings. A model that is 'worse' on MMLU may be identical on your customer support classification task and 60x cheaper. Run a 500-sample benchmark on your real data before committing to a model for production.",
        },
        {
          type: "table",
          headers: ["Task Type", "Recommended Model", "Why"],
          rows: [
            [
              "Binary classification",
              "Titan Lite or Haiku",
              "Simple pattern matching; Opus adds no value",
            ],
            [
              "Named entity extraction",
              "Claude 3 Haiku",
              "Structured output; fast and cheap",
            ],
            [
              "Multi-doc summarization",
              "Claude 3.5 Sonnet",
              "Needs 100K+ context window and quality",
            ],
            [
              "Code generation (complex)",
              "Claude 3.5 Sonnet or Opus",
              "Reasoning depth matters",
            ],
            [
              "Translation",
              "Amazon Translate (not Bedrock)",
              "Purpose-built, 10x cheaper",
            ],
            [
              "Embedding generation",
              "Titan Embeddings v2",
              "Native integration, cost-effective",
            ],
          ],
        },
        {
          type: "bullet-list",
          items: [
            "Tag all Bedrock SDK calls with `x-amzn-bedrock-cost-center` metadata for per-application attribution",
            "Use Bedrock batch inference for any workload that tolerates minutes of latency — 50% instant savings",
            "Enable prompt caching immediately for any system prompt longer than 200 tokens",
            "Monitor `InputTokenCount` and `OutputTokenCount` CloudWatch metrics per model ID with daily alarms",
            "Set Service Quota limits on Bedrock invocations per model to prevent runaway spend from bugs",
            "Benchmark tasks quarterly — model pricing drops frequently as AWS adds new models",
          ],
        },
      ],
      flashcards: [
        {
          id: "m5-bedrock-cost-01",
          moduleId: "5",
          front:
            "A team runs a chatbot on Claude 3 Opus. The product manager asks to cut AI costs without changing the UX. What is the first thing to investigate?",
          back: "Benchmark the chatbot's actual conversations against Claude 3 Haiku or Claude 3.5 Sonnet. Claude 3 Opus costs 60x more than Haiku per input token. For many conversational tasks, Haiku or Sonnet achieves equivalent quality. If a 500-sample test shows acceptable quality on Haiku, the migration alone reduces AI costs by 80–98%.",
          tags: ["bedrock", "model-selection", "cost-optimization"],
        },
        {
          id: "m5-bedrock-cost-02",
          moduleId: "5",
          front:
            "What utilization rate must you sustain to justify Bedrock Provisioned Throughput on a 1-month commitment?",
          back: "Roughly 65% sustained utilization is required to break even on a 1-month Provisioned Throughput commitment versus on-demand pricing (which provides ~30% discount). Below that threshold, on-demand is cheaper because PT is billed per-hour whether used or not. Monitor PT utilization weekly and release unused MUs before commitment renewal.",
          tags: ["bedrock", "provisioned-throughput", "break-even"],
        },
        {
          id: "m5-bedrock-cost-03",
          moduleId: "5",
          front:
            "How does Bedrock prompt caching work and what price does it charge for cached tokens?",
          back: "Prompt caching stores the KV cache of a designated stable prefix (system prompt, few-shot examples) across API calls. Subsequent calls that share that cached prefix pay approximately 10% of the normal input token price for cache reads. The first call that populates the cache pays full price. Only tokens in the prefix before the dynamic content are eligible for caching.",
          tags: ["bedrock", "prompt-caching", "tokens"],
        },
        {
          id: "m5-bedrock-cost-04",
          moduleId: "5",
          front:
            "What is a Bedrock cross-region inference profile and when does it reduce costs?",
          back: "A cross-region inference profile lets Bedrock route requests to a secondary region when the primary region is capacity-constrained. It is primarily a reliability feature — preventing throttling — rather than a direct cost reduction tool. It can indirectly reduce costs by allowing you to purchase less Provisioned Throughput headroom, since cross-region routing handles burst capacity without over-provisioning.",
          tags: ["bedrock", "cross-region", "inference-profiles"],
        },
        {
          id: "m5-bedrock-cost-05",
          moduleId: "5",
          front:
            "When is Bedrock batch inference the right choice and what discount does it provide?",
          back: "Bedrock batch inference is ideal for offline, non-real-time workloads: document summarization pipelines, nightly data enrichment, bulk classification of historical records. It processes prompts asynchronously from S3 and delivers results to S3. It costs approximately 50% less than equivalent on-demand invocations with no throughput commitment required.",
          tags: ["bedrock", "batch-inference", "cost-optimization"],
        },
      ],
    },
    {
      id: "token-optimization",
      title: "Token Cost Reduction Strategies",
      estimatedMinutes: 14,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "The Token Is the Unit of Cost",
        },
        {
          type: "paragraph",
          text: "Every optimization technique in GenAI FinOps ultimately reduces to one question: **can we accomplish the same result with fewer tokens?** Tokens are the currency of LLM economics. A system that processes 1 billion tokens/month at $0.00025/1K costs $250/month; the same workload on a poorly-optimized prompt that sends 4x as many tokens costs $1,000/month. The techniques in this section are how engineering teams close that gap.",
        },
        {
          type: "heading",
          level: 3,
          text: "Prompt Engineering for Brevity",
        },
        {
          type: "paragraph",
          text: "Most production system prompts contain significant waste: redundant instructions ('Be helpful. Be accurate. Be concise.' repeated three times), verbose role-playing preambles, and examples that could be represented more compactly. A disciplined prompt audit can reduce system prompt length by 40–60% with no quality regression. Tools like Anthropic's prompt optimizer or manual compression exercises are cost-effective investments.",
        },
        {
          type: "bullet-list",
          items: [
            "Remove filler phrases ('As an AI assistant...', 'Certainly, I will...')",
            "Consolidate redundant instructions into single authoritative statements",
            "Replace verbose few-shot examples with compact, information-dense examples",
            "Use structured formats (JSON schema, XML tags) to replace verbose parsing instructions",
            "Specify output format constraints inline rather than in separate instruction blocks",
            "Remove defensive instructions that address edge cases that never occur in your traffic",
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Context Window Management",
        },
        {
          type: "paragraph",
          text: "Multi-turn conversations accumulate context. A 10-turn conversation where each turn adds 200 tokens means turn 10 sends 2,000 tokens of history — regardless of whether all of it is relevant. Strategies for managing context include: **sliding window** (keep only last N turns), **conversation summarization** (compress older turns into a summary), and **selective retrieval** (store turns in a vector DB and retrieve only the semantically relevant ones).",
        },
        {
          type: "table",
          headers: [
            "Strategy",
            "Token Savings",
            "Quality Impact",
            "Implementation Effort",
          ],
          rows: [
            [
              "Sliding window (last 5 turns)",
              "40–70%",
              "Low-medium (loses distant context)",
              "Low",
            ],
            [
              "Conversation summarization",
              "60–80%",
              "Low (preserves key facts)",
              "Medium",
            ],
            ["Selective retrieval from history", "70–85%", "Minimal", "High"],
            ["No context management", "0%", "None", "None (but costly)"],
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Semantic Caching",
        },
        {
          type: "paragraph",
          text: "Semantic caching stores LLM responses and retrieves cached answers for semantically similar future queries. If 'What is the return policy?' and 'How do I return a product?' yield the same answer, the second query should be served from cache rather than invoking the model again. Tools like **GPTCache** or **Redis with vector similarity search** can achieve 20–40% cache hit rates on customer service and FAQ workloads, eliminating those LLM calls entirely.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Semantic Cache Hit Rates Compound Quickly",
          text: "A 30% cache hit rate on a workload costing $10,000/month saves $3,000/month ($36,000/year). Cache infrastructure costs $100–$500/month. ROI is achieved within the first week. Any customer-facing application with repetitive query patterns should implement semantic caching before launch.",
        },
        {
          type: "heading",
          level: 3,
          text: "Output Length Constraints and Streaming",
        },
        {
          type: "paragraph",
          text: "Output tokens cost 4–5x more per token than input tokens on most models. Leaving output length unconstrained is one of the most common cost mistakes. Use `max_tokens` parameters to cap responses at the length your UI can actually display. For a chatbot response that fits in a 200-word bubble, capping at 300 tokens prevents the model from generating 2,000-token essays that users never read.",
        },
        {
          type: "paragraph",
          text: "**Streaming vs synchronous:** Streaming (SSE) allows users to see responses as they generate, improving perceived latency. It does not reduce token count or cost — you pay for the same tokens either way. Streaming is a UX optimization, not a cost optimization. However, streaming enables **early termination**: if a user closes the chat window mid-stream, you can cancel the request and avoid paying for the remaining tokens.",
        },
        {
          type: "heading",
          level: 3,
          text: "Batching API Calls and Embedding Model Selection",
        },
        {
          type: "paragraph",
          text: "For workloads processing many documents independently (not requiring real-time responses), **batching** reduces overhead and enables batch pricing. Bedrock batch inference cuts costs 50%. For embedding generation, **Amazon Titan Embeddings v2** ($0.00002/1K tokens) is significantly cheaper than calling Bedrock foundation models to generate embeddings manually. For high-volume pipelines embedding 10M product descriptions (avg 50 tokens each), Titan Embeddings costs $10 vs $125 on Titan Text Express.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Embedding Costs at Scale: A Real Example",
          text: "A retail company with 10M product descriptions, re-embedding nightly for freshness: at 50 tokens/product, that is 500M tokens/night. At Titan Embeddings v2 pricing ($0.00002/1K), nightly cost is $10. At Cohere Embed on Bedrock ($0.0001/1K), that is $50/night. Annual difference: $14,600. Only re-embed products that actually changed — most product catalogs have <5% daily change rate, dropping the nightly bill to $0.50.",
        },
        {
          type: "numbered-list",
          items: [
            "Audit system prompts monthly — measure token count before and after each change",
            "Implement `max_tokens` caps on all production endpoints with UI-appropriate limits",
            "Deploy semantic caching for any high-traffic FAQ, support, or Q&A application",
            "Use conversation summarization for multi-turn assistants beyond 5 turns",
            "Use Titan Embeddings v2 for all embedding workloads unless a specific model's quality is verified superior",
            "Schedule batch inference jobs for any pipeline that can tolerate async processing",
            "Instrument token counts per request in CloudWatch custom metrics from day one",
          ],
        },
      ],
      flashcards: [
        {
          id: "m5-token-optimization-01",
          moduleId: "5",
          front: "What is semantic caching and how does it reduce LLM costs?",
          back: "Semantic caching stores LLM responses indexed by the embedding of the query. When a new query arrives, its embedding is compared to cached query embeddings. If similarity exceeds a threshold (e.g., 0.92 cosine similarity), the cached response is returned without calling the LLM. On workloads with repetitive queries (FAQ, customer support), hit rates of 20–40% are achievable, eliminating those API calls and their costs entirely.",
          tags: ["caching", "token-optimization", "semantic-cache"],
        },
        {
          id: "m5-token-optimization-02",
          moduleId: "5",
          front:
            "Why are output tokens more expensive than input tokens in Bedrock pricing, and what is the practical implication?",
          back: "Output token generation is computationally heavier than prompt processing — the model generates each token autoregressively, requiring a full forward pass per token. Most models charge 4–5x more per output token than input token. The practical implication: always set `max_tokens` to the minimum length your application needs. An unconstrained output can cost 5–10x more than a length-bounded one for the same task.",
          tags: ["tokens", "output-length", "pricing"],
        },
        {
          id: "m5-token-optimization-03",
          moduleId: "5",
          front:
            "What are three effective strategies for managing context window costs in multi-turn conversations?",
          back: "1. **Sliding window:** Keep only the last N turns in context, discarding older messages. Simple but loses distant context. 2. **Conversation summarization:** Periodically compress older turns into a short summary, preserving key facts at lower token cost. 3. **Selective retrieval:** Store all turns in a vector DB and retrieve only semantically relevant turns for each new message, achieving the best quality-to-token ratio at the highest implementation cost.",
          tags: ["context-window", "conversation", "token-optimization"],
        },
        {
          id: "m5-token-optimization-04",
          moduleId: "5",
          front:
            "Does streaming (SSE) reduce LLM costs compared to synchronous requests?",
          back: "No. Streaming does not reduce token count or cost — you pay for the same tokens whether streamed or returned in a single response. Streaming is a UX optimization (perceived latency improvement). The one indirect cost benefit is that streaming enables early request cancellation: if the user closes the UI mid-stream, you can cancel the request and avoid paying for remaining tokens.",
          tags: ["streaming", "tokens", "cost-optimization"],
        },
        {
          id: "m5-token-optimization-05",
          moduleId: "5",
          front:
            "For a pipeline embedding 10M product descriptions nightly, what embedding model and optimization would minimize cost?",
          back: "Use Amazon Titan Embeddings v2 at $0.00002/1K tokens — the cheapest Bedrock embedding option. More importantly, implement incremental embedding: only re-embed products that changed since the last run. Most product catalogs have less than 5% daily change rate, so this single optimization reduces the nightly embedding bill by 95%, from $10 to $0.50 on Titan Embeddings v2.",
          tags: ["embeddings", "titan", "cost-optimization"],
        },
      ],
    },
    {
      id: "sagemaker-cost",
      title: "SageMaker Cost Optimization",
      estimatedMinutes: 15,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "SageMaker Cost Architecture: Training vs Inference",
        },
        {
          type: "paragraph",
          text: "SageMaker costs split into two fundamentally different profiles. **Training** is compute-intensive and time-bounded: you run expensive GPU instances for hours or days, then they stop. **Inference** is continuous and latency-sensitive: instances run 24/7 to serve real-time requests. The cost optimization levers for each phase are completely different, and teams often make the mistake of applying training strategies to inference or vice versa.",
        },
        {
          type: "table",
          headers: [
            "Instance",
            "GPU/Accelerator",
            "vCPUs",
            "Memory",
            "On-Demand Price",
            "Best For",
          ],
          rows: [
            [
              "p4d.24xlarge",
              "8x A100 40GB",
              "96",
              "1,152 GB",
              "~$32/hr",
              "Distributed LLM training",
            ],
            [
              "p5.48xlarge",
              "8x H100 80GB",
              "192",
              "2,048 GB",
              "~$98/hr",
              "Large-scale foundation model training",
            ],
            [
              "g5.12xlarge",
              "4x A10G 24GB",
              "48",
              "192 GB",
              "~$5.67/hr",
              "Fine-tuning 7B–13B parameter models",
            ],
            [
              "g5.xlarge",
              "1x A10G 24GB",
              "4",
              "16 GB",
              "~$1.01/hr",
              "Fine-tuning small models, inference",
            ],
            [
              "ml.g5.4xlarge",
              "1x A10G 24GB",
              "16",
              "64 GB",
              "~$2.03/hr",
              "SageMaker real-time inference endpoint",
            ],
            [
              "ml.inf2.xlarge",
              "1x Inferentia2",
              "4",
              "16 GB",
              "~$0.76/hr",
              "High-throughput LLM inference",
            ],
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Managed Spot Training: Up to 90% Savings",
        },
        {
          type: "paragraph",
          text: "SageMaker Managed Spot Training runs training jobs on EC2 Spot instances with automatic checkpoint management. SageMaker saves checkpoints to S3 at your configured interval and resumes jobs automatically after a Spot interruption — no manual intervention required. For a 10-hour p4d.24xlarge training job at $32/hr on-demand ($320 total), Spot pricing of $6/hr reduces that to $60 — **an 81% saving**. Checkpoint overhead (typically 2–5 minutes per checkpoint) is negligible against this discount.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Checkpoint Interval Formula",
          text: "Set checkpoint interval = max acceptable re-work time / Spot interruption probability. For p4d instances with ~15% hourly interruption probability, a 30-minute checkpoint interval means worst-case loss of 30 minutes of compute. On a 10-hour job, that is a 5% re-work overhead against an 81% cost saving — an excellent trade.",
        },
        {
          type: "heading",
          level: 3,
          text: "SageMaker Savings Plans",
        },
        {
          type: "paragraph",
          text: "SageMaker Savings Plans offer up to 64% discount on SageMaker instance usage in exchange for a committed hourly spend over 1 or 3 years. Unlike EC2 Reserved Instances, Savings Plans apply across instance families, sizes, regions, and SageMaker components (training jobs, inference endpoints, SageMaker Studio notebooks). A $10/hr SageMaker Savings Plan commitment automatically applies discounts to whatever combination of SageMaker resources you use, without locking to specific instance types.",
        },
        {
          type: "table",
          headers: [
            "Commitment Term",
            "Max Discount",
            "Flexibility",
            "Recommended For",
          ],
          rows: [
            [
              "No commitment (on-demand)",
              "0%",
              "Full",
              "Variable or experimental workloads",
            ],
            [
              "1-year Savings Plan",
              "~40%",
              "Instance-family flexible",
              "Proven production inference workloads",
            ],
            [
              "3-year Savings Plan",
              "~64%",
              "Instance-family flexible",
              "Stable, long-term ML infrastructure",
            ],
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Multi-Model Endpoints: Sharing Infrastructure Across Models",
        },
        {
          type: "paragraph",
          text: "SageMaker Multi-Model Endpoints (MME) host thousands of models on a single endpoint instance, loading and unloading models from memory dynamically based on traffic. Instead of 50 separate `ml.g5.xlarge` endpoints at $1.01/hr each ($1,212/month total), one MME instance hosts all 50 models with dynamic loading, costing $1.01/hr ($727/month). The trade-off: models not recently invoked may experience a cold-load latency of 1–10 seconds when first called after being evicted from memory.",
        },
        {
          type: "heading",
          level: 3,
          text: "Serverless Inference vs Real-Time vs Async",
        },
        {
          type: "paragraph",
          text: "SageMaker offers three inference deployment modes with different cost profiles. **Real-Time Inference** runs persistent instances billed per hour — best for latency-sensitive, consistent traffic. **Serverless Inference** scales to zero between requests, charging per invocation and memory-second — best for spiky or low-traffic models. **Async Inference** processes requests from SQS queues on demand, auto-scaling instances, ideal for large payloads (up to 1GB) and variable traffic with no real-time requirement.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Serverless Inference Cold Starts at Scale",
          text: "Serverless Inference cold starts can add 1–5 seconds for models larger than 1GB. For P99 latency SLAs under 500ms, Serverless is unsuitable. Use Provisioned Concurrency to pre-warm Serverless endpoints if cold starts are unacceptable but idle instances are wasteful.",
        },
        {
          type: "bullet-list",
          items: [
            "Enable Managed Spot Training for every training job that implements checkpointing — no exceptions",
            "Use SageMaker Savings Plans for any inference endpoint running 8+ hours/day consistently",
            "Consolidate low-traffic per-tenant models onto Multi-Model Endpoints",
            "Delete idle notebook instances and SageMaker Studio domains — they bill per hour when active",
            "Use Async Inference for document processing pipelines — no persistent instance cost between bursts",
            "Right-size inference instances by profiling GPU utilization: below 40% utilization, downgrade one instance size",
            "Set SageMaker endpoint auto-scaling policies to scale in aggressively during low-traffic periods",
          ],
        },
      ],
      flashcards: [
        {
          id: "m5-sagemaker-cost-01",
          moduleId: "5",
          front:
            "A 10-hour p4d.24xlarge training job costs $320 on-demand. What would it cost with SageMaker Managed Spot Training at typical Spot pricing, and what is required to enable it?",
          back: "At approximately 80% Spot discount, the same job costs ~$64 (saving $256). To enable Managed Spot Training: (1) implement checkpoint saving to S3 in your training script, (2) set `use_spot_instances=True` and `checkpoint_s3_uri` in the SageMaker Estimator, and (3) set `max_wait` to handle potential wait time for Spot capacity. SageMaker handles interruption detection and job resumption automatically.",
          tags: ["sagemaker", "spot", "training"],
        },
        {
          id: "m5-sagemaker-cost-02",
          moduleId: "5",
          front:
            "Why are SageMaker Savings Plans more practical than EC2 Reserved Instances for ML teams?",
          back: "SageMaker Savings Plans apply automatically across all SageMaker instance families, sizes, regions, and components (training, inference, notebooks). As a team's ML infrastructure evolves — switching from p3 to p4d for training, or adding new inference endpoints — the Savings Plan coverage follows without renegotiation. EC2 Reserved Instances lock to a specific instance type and AZ, becoming stranded if the workload migrates to a different instance family.",
          tags: ["sagemaker", "savings-plans", "reservations"],
        },
        {
          id: "m5-sagemaker-cost-03",
          moduleId: "5",
          front:
            "A team has 80 per-customer fine-tuned models, each receiving 2–3 requests/hour. What deployment strategy minimizes cost and what is the main trade-off?",
          back: "Multi-Model Endpoints (MME): host all 80 models on 1–2 shared instances, dynamically loading models on demand. Cost drops from 80 instances (~$80+/hr) to 1–2 instances (~$1–2/hr). The trade-off is cold-load latency of 1–10 seconds when a model is first invoked after being evicted from memory — acceptable for non-latency-critical workloads, but requires cache eviction policy tuning to keep the most-active models in memory.",
          tags: ["sagemaker", "multi-model", "inference"],
        },
        {
          id: "m5-sagemaker-cost-04",
          moduleId: "5",
          front:
            "When should you choose SageMaker Async Inference over Real-Time Inference?",
          back: "Async Inference is optimal when: (1) requests can tolerate seconds-to-minutes of latency, (2) payloads are large (up to 1GB, vs 6MB for real-time), (3) traffic is bursty or unpredictable, and (4) you want to avoid paying for idle instances. Async Inference auto-scales instances from the SQS queue and scales to zero when the queue is empty. Typical use cases: document processing, batch image analysis, overnight report generation.",
          tags: ["sagemaker", "async-inference", "cost-optimization"],
        },
      ],
    },
    {
      id: "ec2-for-ai",
      title: "EC2 GPU & Accelerator Instances",
      estimatedMinutes: 13,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "AWS Accelerated Computing Instance Families",
        },
        {
          type: "paragraph",
          text: "AWS offers six primary instance families for AI/ML workloads, each with different accelerators, memory configurations, and price-performance characteristics. The right choice depends on whether you are training or serving, the size of your model, your throughput requirements, and your latency SLA. Choosing the wrong family can result in 3–10x overspending compared to the optimal instance type.",
        },
        {
          type: "table",
          headers: [
            "Instance",
            "Accelerator",
            "GPU Memory",
            "On-Demand Price",
            "Spot Discount",
            "Best Use Case",
          ],
          rows: [
            [
              "p5.48xlarge",
              "8x H100 80GB NVLink",
              "640 GB",
              "~$98/hr",
              "~50%",
              "Foundation model pre-training, large-scale distributed training",
            ],
            [
              "p4d.24xlarge",
              "8x A100 40GB NVLink",
              "320 GB",
              "~$32/hr",
              "~60–70%",
              "Distributed training, research, multi-node LLM training",
            ],
            [
              "g5.48xlarge",
              "8x A10G 24GB",
              "192 GB",
              "~$16/hr",
              "~60–70%",
              "Inference serving, medium-model fine-tuning",
            ],
            [
              "g6.48xlarge",
              "8x L40S 48GB",
              "384 GB",
              "~$18/hr",
              "~50%",
              "Inference serving, large-model fine-tuning",
            ],
            [
              "inf2.48xlarge",
              "12x Inferentia2",
              "384 GB",
              "~$12/hr",
              "~50%",
              "High-throughput LLM inference (post-compilation)",
            ],
            [
              "trn1.32xlarge",
              "16x Trainium",
              "512 GB",
              "~$21/hr",
              "~40%",
              "LLM pre-training and fine-tuning with Neuron SDK",
            ],
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "AWS Inferentia2: Purpose-Built Inference at Lower Cost",
        },
        {
          type: "paragraph",
          text: "AWS Inferentia2 (Inf2 instances) delivers 50–70% lower cost per token compared to equivalent GPU instances for LLMs, because the hardware is engineered specifically for transformer inference rather than training. The trade-off is a one-time model compilation step using the **AWS Neuron SDK**. Once compiled, models achieve higher throughput per dollar than any GPU option. For a production chatbot serving 10M tokens/day, the difference between `inf2.xlarge` and `g5.xlarge` is roughly $8,500/year on inference costs alone.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Compile Once, Save Forever",
          text: "Neuron SDK compilation takes 30–60 minutes per model. This is a one-time cost that saves 50–70% on every inference token for the life of that model deployment. Store compiled Neuron artifacts in S3 and load from cache on instance start. The engineering investment pays back within the first week of production traffic.",
        },
        {
          type: "heading",
          level: 3,
          text: "AWS Trainium: Cost-Competitive Training",
        },
        {
          type: "paragraph",
          text: "Trn1 instances use AWS Trainium accelerators — purpose-built for deep learning training. Trn1.32xlarge ($21/hr) with 16 Trainium chips delivers competitive price-performance for LLM pre-training and fine-tuning versus p4d.24xlarge ($32/hr). For teams training models from scratch or running extensive fine-tuning campaigns, Trn1 can reduce training costs by 30–40% versus equivalent p4d configurations after Neuron SDK adaptation.",
        },
        {
          type: "heading",
          level: 3,
          text: "Capacity Reservations for GPU Instances",
        },
        {
          type: "paragraph",
          text: "P5 and P4d instances have constrained regional availability — requesting them on-demand during peak periods can result in `InsufficientInstanceCapacity` errors that block critical training runs. **On-Demand Capacity Reservations (ODCR)** guarantee a specific instance type in a specific AZ, billed at the on-demand rate whether used or not. For deadline-driven projects, pair ODCRs with Reserved Instances or Savings Plans to offset the on-demand hourly cost while guaranteeing availability.",
        },
        {
          type: "heading",
          level: 3,
          text: "Spot Instances for Fault-Tolerant Training",
        },
        {
          type: "paragraph",
          text: "For training workloads that checkpoint state to S3, EC2 Spot can reduce GPU compute costs by 60–90%. Use **EC2 Fleet** or **Auto Scaling Groups with mixed instances policy** — specify multiple instance types (e.g., p4d.24xlarge, p3.16xlarge, g5.48xlarge) to increase Spot pool diversity and reduce interruption probability. The **capacity-optimized** Spot allocation strategy selects pools with the most available capacity, minimizing interruptions for long-running training jobs.",
        },
        {
          type: "heading",
          level: 3,
          text: "EC2 UltraClusters for Large-Scale Distributed Training",
        },
        {
          type: "paragraph",
          text: "For training runs requiring hundreds of GPU instances with ultra-low-latency inter-node communication, AWS offers **EC2 UltraClusters** — pre-provisioned clusters of P4d or P5 instances connected via Elastic Fabric Adapter (EFA) with 3,200 Gbps non-blocking bandwidth. UltraClusters eliminate the latency bottleneck of network communication in distributed training, dramatically improving GPU utilization. They require advance capacity reservation and are billed at on-demand rates.",
        },
        {
          type: "numbered-list",
          items: [
            "Evaluate Inf2 for any LLM inference workload — compile and benchmark before committing to GPU instances",
            "Use capacity-optimized Spot allocation strategy for GPU training clusters, never lowest-price",
            "Reserve P5/P4d capacity 4+ weeks ahead for planned training runs — do not rely on on-demand availability",
            "Implement EFA (Elastic Fabric Adapter) for multi-node distributed training to minimize communication overhead",
            "Monitor GPU utilization with CloudWatch — `GPUUtilization` below 40% signals right-sizing opportunity",
            "Consider Trn1 over p4d for new training projects — 30–40% potential cost reduction with Neuron SDK",
          ],
        },
      ],
      flashcards: [
        {
          id: "m5-ec2-for-ai-01",
          moduleId: "5",
          front:
            "What is the cost advantage of AWS Inferentia2 for LLM inference and what is required to use it?",
          back: "Inf2 instances deliver 50–70% lower cost per token for LLM inference compared to equivalent GPU instances (G5/G6). This is because Inferentia2 hardware is purpose-built for transformer inference. To use Inf2, models must be compiled with the AWS Neuron SDK — a one-time process that takes 30–60 minutes per model. Compiled artifacts are stored in S3 and reloaded on instance start.",
          tags: ["inferentia", "inf2", "neuron-sdk", "inference"],
        },
        {
          id: "m5-ec2-for-ai-02",
          moduleId: "5",
          front:
            "Why should you use the capacity-optimized Spot allocation strategy (not lowest-price) for GPU training clusters?",
          back: "The capacity-optimized strategy selects Spot instance pools with the most available capacity, which directly minimizes interruption frequency. For GPU training jobs that take hours or days, fewer interruptions means less checkpoint overhead and more predictable completion times. The lowest-price strategy selects the cheapest pools, which often have the least capacity and highest interruption probability — a false economy for long training runs.",
          tags: ["spot", "gpu", "allocation-strategy", "training"],
        },
        {
          id: "m5-ec2-for-ai-03",
          moduleId: "5",
          front:
            "What is an EC2 On-Demand Capacity Reservation (ODCR) and when is it critical for AI workloads?",
          back: "An ODCR reserves a specific EC2 instance type in a specific Availability Zone, guaranteeing that capacity is available when you need it. Billed at on-demand rates whether used or not. Critical for P5 and P4d GPU instances, which have constrained regional availability — without an ODCR, a training run scheduled to start Monday morning may fail with InsufficientInstanceCapacity if another team reserved all available GPUs. Reserve 4+ weeks in advance for large training runs.",
          tags: ["capacity-reservation", "gpu", "p5", "p4d"],
        },
        {
          id: "m5-ec2-for-ai-04",
          moduleId: "5",
          front:
            "Compare Trn1 vs p4d for LLM training: cost, capability, and trade-offs.",
          back: "**Trn1.32xlarge ($21/hr):** AWS Trainium accelerators, purpose-built for training, 512 GB HBM, requires Neuron SDK adaptation. 30–40% cheaper than p4d for equivalent training throughput after Neuron optimization. **p4d.24xlarge ($32/hr):** 8x A100 40GB GPUs, broad PyTorch/CUDA compatibility, mature tooling ecosystem. Trade-off: p4d has less engineering friction (standard CUDA/PyTorch); Trn1 requires Neuron SDK code changes but delivers substantially lower training costs for teams willing to invest in the adaptation.",
          tags: ["trainium", "trn1", "p4d", "training-cost"],
        },
        {
          id: "m5-ec2-for-ai-05",
          moduleId: "5",
          front: "What is an EC2 UltraCluster and when would you use one?",
          back: "EC2 UltraClusters are pre-provisioned clusters of P4d or P5 instances connected via Elastic Fabric Adapter (EFA) with 3,200 Gbps non-blocking bandwidth. They are used for large-scale distributed training of foundation models requiring hundreds of GPUs with ultra-low latency inter-node communication. EFA eliminates the network bottleneck that otherwise throttles GPU utilization in multi-node training. Requires advance capacity reservation and is billed at on-demand rates.",
          tags: ["ultracluster", "efa", "distributed-training", "p5"],
        },
      ],
    },
    {
      id: "ai-governance",
      title: "AI Spend Governance",
      estimatedMinutes: 12,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Why AI Workloads Need Special Governance",
        },
        {
          type: "paragraph",
          text: "Traditional cloud resources have predictable cost envelopes: an EC2 instance has a known hourly rate, S3 has known per-GB pricing. Generative AI breaks this model. A single malicious prompt injection attack that forces the model to generate 100K-token responses can spike monthly costs by thousands of dollars in minutes. A developer who accidentally deploys a test prompt with a 10,000-token few-shot example to production causes immediate financial damage. AI workloads require **proactive governance** — not just cost visibility.",
        },
        {
          type: "heading",
          level: 3,
          text: "Tagging AI Workloads for Cost Attribution",
        },
        {
          type: "paragraph",
          text: "Without consistent tagging, AI costs are invisible at the use-case level. A $200K/month Bedrock bill tells you nothing about whether the expense comes from your RAG chatbot, your document summarization pipeline, or a rogue development environment. Establish a mandatory AI cost allocation taxonomy and enforce it with AWS Organizations tag policies and AWS Config rules.",
        },
        {
          type: "table",
          headers: ["Tag Key", "Example Value", "Purpose"],
          rows: [
            [
              "model-id",
              "anthropic.claude-3-haiku-20240307-v1:0",
              "Track cost by model",
            ],
            ["use-case", "customer-support-rag", "Attribution by AI feature"],
            ["team", "platform-ai", "Showback/chargeback to teams"],
            ["environment", "production", "Separate dev from prod spend"],
            ["cost-center", "CC-1042", "Finance attribution"],
            ["project", "genai-mvp-q1", "Temporary project tagging"],
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "AWS Budgets for AI Spend by Model and Team",
        },
        {
          type: "paragraph",
          text: "Configure separate AWS Budgets for each major AI workload, filtered by cost allocation tags. A budget for the 'customer-support-rag' use case tag lets you alert when that specific application exceeds its monthly allocation, independently of other AI spend. Use **Budget Actions** to automatically restrict IAM permissions on Bedrock invocation roles when a threshold is breached — this creates an automatic circuit breaker that prevents runaway spend without requiring human intervention at 2 AM.",
        },
        {
          type: "callout",
          variant: "important",
          title: "Budget Actions Are Your AI Circuit Breaker",
          text: "Configure a Budget Action that attaches a deny-all-Bedrock IAM policy to the production inference role when spend reaches 80% of monthly budget. This is the difference between a $5K overage and a $50K overage from a prompt injection attack or runaway agent loop. Test the action quarterly to ensure it still applies correctly.",
        },
        {
          type: "heading",
          level: 3,
          text: "Cost Anomaly Detection for Prompt Injection and Token Spikes",
        },
        {
          type: "paragraph",
          text: "AWS Cost Anomaly Detection uses ML to identify unusual spend patterns against your historical baseline. Configure a separate monitor for each AI service (Bedrock, SageMaker) with alert thresholds appropriate to your traffic patterns. A sudden 10x spike in Bedrock token consumption can indicate: (1) a prompt injection attack forcing long completions, (2) an agentic loop bug with infinite retries, (3) a viral traffic surge, or (4) a misconfigured `max_tokens=999999` parameter. Anomaly Detection surfaces these within hours.",
        },
        {
          type: "heading",
          level: 3,
          text: "Bedrock Guardrails for Output Length and Rate Limits",
        },
        {
          type: "paragraph",
          text: "Amazon Bedrock Guardrails enforce content policies, PII redaction, and — critically for cost governance — **output length limits** at the API gateway level. Even if application code contains a bug that passes `max_tokens=100000`, a Guardrail can enforce a maximum of 2,000 tokens per response. Combined with **Service Quotas** on model invocation rates (requests per minute per model), Guardrails create a cost ceiling that is enforced by the AWS control plane rather than application logic.",
        },
        {
          type: "heading",
          level: 3,
          text: "Building an AI Unit Economics Dashboard",
        },
        {
          type: "paragraph",
          text: "The most mature FinOps teams measure AI workloads not in dollars but in **unit economics**: cost per inference, cost per active user, cost per successful resolution. These metrics connect AI spend to business value and make trade-off decisions concrete. A chatbot that costs $0.12 per conversation with 85% resolution rate is a better investment than one that costs $0.05 per conversation with 40% resolution rate.",
        },
        {
          type: "table",
          headers: ["Unit Metric", "Formula", "Target Benchmark"],
          rows: [
            [
              "Cost per inference",
              "Total AI spend / total API calls",
              "<$0.01 for simple tasks, <$0.10 for complex",
            ],
            [
              "Cost per active user/month",
              "Total AI spend / monthly active users",
              "<$2/user for internal tools, <$5/user for consumer",
            ],
            [
              "Cost per successful resolution",
              "Total AI spend / resolved queries",
              "Depends on business value per resolution",
            ],
            [
              "Token efficiency ratio",
              "Output tokens / input tokens",
              "Higher is more efficient; benchmark your workload",
            ],
            [
              "Cache hit rate",
              "Cached responses / total responses",
              ">20% target for repetitive query workloads",
            ],
          ],
        },
        {
          type: "numbered-list",
          items: [
            "Enforce mandatory tags (model-id, use-case, team, environment) with AWS Organizations tag policies",
            "Create separate AWS Budgets per use-case tag with Budget Actions that restrict IAM on threshold breach",
            "Configure Cost Anomaly Detection monitors for Bedrock and SageMaker separately with appropriate impact thresholds",
            "Set Bedrock Guardrails with maximum output token limits on all production endpoints",
            "Publish weekly AI unit economics metrics (cost/inference, cost/user) to a shared dashboard visible to both engineering and finance",
            "Conduct monthly AI spend reviews with each team — show per-model and per-use-case breakdown",
            "Test Budget Actions quarterly to confirm circuit breaker IAM policies still apply correctly",
          ],
        },
      ],
      flashcards: [
        {
          id: "m5-ai-governance-01",
          moduleId: "5",
          front:
            "How can a prompt injection attack cause unexpected AWS cost spikes, and what two controls prevent it?",
          back: "A prompt injection attack can force the model to generate extremely long responses by embedding instructions like 'repeat everything 1,000 times' in user input. Controls: (1) **Bedrock Guardrails** with a maximum output token limit enforced at the API level — regardless of what `max_tokens` the application sends. (2) **Cost Anomaly Detection** on Bedrock spend to alert within hours when token consumption spikes 10x above baseline, enabling rapid investigation and response.",
          tags: ["security", "guardrails", "anomaly-detection", "governance"],
        },
        {
          id: "m5-ai-governance-02",
          moduleId: "5",
          front:
            "What is a Budget Action and how does it serve as an AI cost circuit breaker?",
          back: "AWS Budget Actions automatically execute governance responses when a budget threshold is breached. For AI workloads, configure a Budget Action that attaches a restrictive IAM policy (denying Bedrock or SageMaker invocations) to production inference roles when spend reaches 80–100% of the monthly budget. This stops further API calls automatically — without requiring human intervention — preventing a $5K overage from becoming a $50K disaster.",
          tags: ["budgets", "budget-actions", "iam", "governance"],
        },
        {
          id: "m5-ai-governance-03",
          moduleId: "5",
          front:
            "What six tags should be mandatory on all AI workload resources for cost governance?",
          back: "Recommended mandatory tags: (1) `model-id` — the specific model being invoked, (2) `use-case` — the AI feature or application, (3) `team` — the owning team for showback/chargeback, (4) `environment` — dev/staging/production to separate spend, (5) `cost-center` — finance attribution code, (6) `project` — for temporary project-level attribution. Enforce with AWS Organizations tag policies and AWS Config rules that flag non-compliant resources.",
          tags: ["tagging", "cost-allocation", "governance"],
        },
        {
          id: "m5-ai-governance-04",
          moduleId: "5",
          front:
            "What are AI unit economics metrics and why are they more useful than raw dollar spend for FinOps decisions?",
          back: "AI unit economics express cost relative to business value: cost per inference, cost per active user/month, cost per successful resolution. Raw dollar spend (e.g., '$50K/month on Bedrock') does not indicate efficiency — a workload serving 10M users at $50K is excellent, serving 1K users at $50K is a crisis. Unit economics enable meaningful trade-off decisions: 'Should we upgrade to Sonnet if it increases resolution rate from 70% to 85%, even though it triples cost per inference?'",
          tags: ["unit-economics", "governance", "finops-metrics"],
        },
        {
          id: "m5-ai-governance-05",
          moduleId: "5",
          front:
            "How do Bedrock Guardrails and Service Quotas work together to enforce cost ceilings?",
          back: "**Bedrock Guardrails** enforce per-request constraints at the API level: maximum output token length, content filtering, PII redaction. Even if application code sends `max_tokens=100000`, a Guardrail cap of 2,000 tokens is enforced by AWS. **Service Quotas** cap the total invocation rate (requests per minute per model). Together they create two layers of cost ceiling: per-request spend is bounded by Guardrails, and aggregate throughput is bounded by Service Quotas — both enforced by the AWS control plane, not application code.",
          tags: ["guardrails", "service-quotas", "governance"],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m5-q1",
      text: "A startup is building a customer support chatbot on Amazon Bedrock. During development they use Claude 3 Opus and are now planning production launch at 100,000 conversations/day, each with 500 input tokens and 200 output tokens. The engineering team argues they need Opus for quality. What should the FinOps team recommend first?",
      options: [
        "Purchase Provisioned Throughput for Claude 3 Opus to get a volume discount",
        "Benchmark the specific support conversations against Claude 3 Haiku before committing to Opus — Haiku costs 60x less per token",
        "Enable cross-region inference profiles to reduce Opus pricing through load distribution",
        "Switch to SageMaker with a self-hosted open-source model to avoid per-token pricing entirely",
      ],
      correctIndex: 1,
      explanation:
        "Model selection is the highest-ROI optimization in Bedrock. At 100K conversations/day with 500 input + 200 output tokens, Opus costs ~$750/day ($273,750/year) vs Haiku at ~$12.50/day ($4,563/year) — a $269K annual difference. Before assuming Opus quality is necessary, benchmark your actual support conversations on Haiku. Many classification, Q&A, and retrieval-augmented tasks achieve equivalent quality at 1/60th the cost. Provisioned Throughput only helps at consistent high utilization; cross-region profiles don't reduce pricing; self-hosting adds significant operational overhead that likely exceeds the cost savings.",
    },
    {
      id: "m5-q2",
      text: "A RAG pipeline processes 5M documents nightly for embedding updates. Currently all 5M documents are re-embedded every night using Amazon Titan Embeddings v2 at $0.00002/1K tokens (avg 50 tokens per document). Monthly embedding costs are $150. A developer proposes switching to a higher-quality embedding model at $0.0001/1K tokens. What is the FinOps-first recommendation?",
      options: [
        "Accept the switch — $0.0001/1K is still inexpensive for the quality improvement",
        "First implement incremental embedding (only re-embed changed documents), then evaluate whether the quality upgrade is justified",
        "Move to Bedrock batch inference to get 50% discount before evaluating the model switch",
        "Implement semantic caching to avoid re-embedding at all",
      ],
      correctIndex: 1,
      explanation:
        "The most impactful optimization is not model selection but eliminating unnecessary work. Product catalogs typically have <5% daily change rates — meaning 95% of nightly re-embeddings are redundant. Implementing incremental embedding (track document hashes, only re-embed changed documents) reduces the 5M nightly embeds to ~250K, dropping monthly cost from $150 to $7.50 on the current model. After this optimization, the higher-quality model at $0.0001/1K would cost $37.50/month — still very reasonable if the quality improvement is justified. Batch inference helps but doesn't address the wasted work. Semantic caching applies to query-time, not embedding pipeline.",
    },
    {
      id: "m5-q3",
      text: "An ML team needs to train a 70B parameter LLM. They estimate 40 hours of p4d.24xlarge compute at $32/hr ($1,280 total). The job uses PyTorch with standard checkpointing to S3 every 30 minutes. Finance asks for cost reduction options. Which combination achieves the greatest savings with acceptable risk?",
      options: [
        "Purchase a 1-year SageMaker Savings Plan covering p4d.24xlarge at 40% discount",
        "Use SageMaker Managed Spot Training with capacity-optimized Spot allocation and 30-minute checkpoints, targeting 70–80% Spot discount",
        "Switch to Trn1.32xlarge instances which cost $21/hr, saving 34% over p4d on-demand",
        "Run the job across multiple smaller g5.xlarge instances to reduce per-instance cost",
      ],
      correctIndex: 1,
      explanation:
        "Managed Spot Training with capacity-optimized allocation targets 70–80% savings ($256–$384 vs $1,280) with acceptable re-work risk: the 30-minute checkpoint interval means worst-case 30 minutes of lost compute per interruption. For a 40-hour job, even 3 interruptions adds only 1.5 hours of overhead — negligible against the savings. SageMaker Savings Plans require consistent utilization and provide only 40–64% discount on committed spend, not per-job savings. Trn1 saves 34% but requires Neuron SDK adaptation — not viable for a standard PyTorch model without engineering investment. Distributing across g5.xlarge would reduce compute density and increase training time.",
    },
    {
      id: "m5-q4",
      text: "A company's Bedrock monthly bill suddenly increases from $15,000 to $180,000 in a single week. AWS Cost Anomaly Detection fires an alert. The AI team investigates and finds InputTokenCount metrics are normal but OutputTokenCount has spiked 12x. What is the most likely root cause and immediate remediation?",
      options: [
        "A cross-region inference profile routing to a more expensive region — disable the profile",
        "A prompt injection attack or application bug causing the model to generate extremely long responses — apply Bedrock Guardrails with a maximum output token limit and investigate request logs",
        "Provisioned Throughput utilization exceeding purchased model units — purchase additional MUs",
        "SageMaker endpoints sharing the same cost allocation tag as Bedrock — separate the tagging taxonomy",
      ],
      correctIndex: 1,
      explanation:
        "A 12x spike in OutputTokenCount while InputTokenCount remains normal indicates the model is generating abnormally long responses — a classic prompt injection pattern or a `max_tokens` bug (e.g., `max_tokens` set to `None` instead of a bounded value). Immediate remediation: (1) Apply Bedrock Guardrails with a hard output token cap (e.g., 2,000 tokens) to prevent further runaway responses, (2) investigate recent application deployments for `max_tokens` changes, (3) review request logs for adversarial prompt patterns. Cross-region profiles don't increase costs. Provisioned Throughput over-utilization would cause throttling errors, not cost spikes. Tag taxonomy issues are a visibility problem, not a cost spike mechanism.",
    },
    {
      id: "m5-q5",
      text: "A FinOps team is building AI unit economics tracking for a Bedrock-powered internal knowledge base serving 500 employees. Current monthly Bedrock spend is $8,000. They want to determine if costs are justified. Which metric best answers the question 'Are we getting business value from this AI investment?' and what additional data is needed?",
      options: [
        "Cost per 1,000 tokens — compare against industry benchmarks to determine if the model choice is efficient",
        "Cost per active user per month ($16/user) combined with a user satisfaction score or self-reported time savings per query",
        "Total token count per month — higher token consumption means more usage and therefore more value",
        "Cache hit rate — a high cache hit rate proves the system is efficient and therefore valuable",
      ],
      correctIndex: 1,
      explanation:
        "Unit economics require connecting cost to business outcome. 'Cost per active user per month' ($8,000 / 500 users = $16/user) is meaningful only when paired with a value metric: if users report saving 30 minutes/week by using the knowledge base instead of searching documentation, and their loaded hourly cost is $75, that's $37.50/week in productivity value — vs $16/month in AI cost. This easily justifies the investment. Cost per token is an efficiency metric, not a value metric. Total token count conflates volume with value. Cache hit rate measures technical efficiency, not business value. The combination of cost-per-user plus outcome measurement (time saved, tickets deflected, resolutions per session) is the gold standard for AI ROI justification.",
    },
  ],
};
