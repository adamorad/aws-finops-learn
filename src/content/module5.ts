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
      id: "bedrock-cost",
      title: "Amazon Bedrock Cost Optimization",
      estimatedMinutes: 12,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Amazon Bedrock Pricing Models",
        },
        {
          type: "paragraph",
          text: "Amazon Bedrock offers two primary pricing models: on-demand and provisioned throughput. On-demand pricing charges per input and output token with no upfront commitment, making it ideal for variable or unpredictable workloads. Provisioned throughput purchases model units (MUs) for a fixed hourly rate, delivering guaranteed throughput and lower per-token costs at scale.",
        },
        {
          type: "table",
          headers: ["Pricing Model", "Best For", "Commitment", "Cost Pattern"],
          rows: [
            ["On-Demand", "Variable/bursty workloads", "None", "Pay per token"],
            [
              "Provisioned Throughput",
              "Steady-state production",
              "1 or 6 months",
              "Hourly flat rate",
            ],
            [
              "Batch Inference",
              "Offline processing",
              "None",
              "50% discount vs on-demand",
            ],
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Model Selection Trade-offs",
        },
        {
          type: "paragraph",
          text: "Choosing the right foundation model is the single largest cost lever in Bedrock. Smaller models like Claude Haiku or Amazon Titan Lite cost 10-20x less per token than frontier models like Claude Opus, yet handle many production tasks adequately. Always benchmark your specific use case before defaulting to the most capable model.",
        },
        {
          type: "table",
          headers: ["Model Tier", "Relative Cost", "Use Cases"],
          rows: [
            [
              "Claude Haiku 3",
              "~$0.25/1M input tokens",
              "Classification, extraction, simple Q&A",
            ],
            [
              "Claude Sonnet 3.5",
              "~$3/1M input tokens",
              "Reasoning, coding, complex analysis",
            ],
            [
              "Claude Opus 3",
              "~$15/1M input tokens",
              "Research, nuanced writing, hard reasoning",
            ],
            [
              "Amazon Titan Lite",
              "~$0.15/1M input tokens",
              "Summarization, lightweight tasks",
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Model Routing Strategy",
          text: "Implement a routing layer that classifies incoming requests by complexity and routes simple queries to cheaper models. A well-tuned router can cut Bedrock costs by 40-60% with negligible quality impact on the overall system.",
        },
        {
          type: "heading",
          level: 3,
          text: "Bedrock Inference Profiles & Caching",
        },
        {
          type: "paragraph",
          text: "Bedrock cross-region inference profiles automatically route requests to the region with available capacity, improving resilience and often reducing latency spikes. Prompt caching (available on select models) stores the KV cache of a common system prompt prefix across calls, reducing input token costs by up to 90% for repeated prefixes in high-volume applications.",
        },
        {
          type: "callout",
          variant: "important",
          title: "Token Optimization Is Mandatory at Scale",
          text: "At 10M+ daily tokens, prompt bloat becomes a major cost driver. Audit system prompts quarterly: remove redundant instructions, compress few-shot examples, and use structured output formats (JSON schema) to eliminate verbose parsing instructions. Every 100 unnecessary tokens per call adds thousands of dollars per month at scale.",
        },
        {
          type: "bullet-list",
          items: [
            "Use Bedrock batch inference for non-real-time workloads — 50% cost reduction with the same models",
            "Enable prompt caching for static system prompts shared across many calls",
            "Tag all Bedrock invocations with cost allocation tags (application, team, environment) via the AWS SDK",
            "Monitor token usage with CloudWatch metrics: InvocationLatency, InputTokenCount, OutputTokenCount",
            "Set per-model usage quotas in Service Quotas to prevent runaway costs from bugs or abuse",
          ],
        },
      ],
      flashcards: [
        {
          id: "m5-bedrock-cost-01",
          moduleId: "5",
          front:
            "What is the cost advantage of Bedrock Provisioned Throughput over on-demand?",
          back: "Provisioned Throughput provides lower per-token costs and guaranteed throughput for sustained workloads, but requires a 1-month or 6-month commitment. It becomes cost-effective when utilization is consistently high (generally 60%+ of purchased capacity).",
          tags: ["bedrock", "pricing", "provisioned-throughput"],
        },
        {
          id: "m5-bedrock-cost-02",
          moduleId: "5",
          front: "How does Bedrock prompt caching reduce costs?",
          back: "Prompt caching stores the KV cache of a common prefix (e.g., system prompt) across API calls. Subsequent calls that share that prefix pay a cache read price (typically ~10% of normal input token cost) instead of reprocessing the full prefix, yielding up to 90% savings on the cached portion.",
          tags: ["bedrock", "prompt-caching", "tokens"],
        },
        {
          id: "m5-bedrock-cost-03",
          moduleId: "5",
          front: "What is Bedrock Batch Inference and when should you use it?",
          back: "Bedrock Batch Inference processes large sets of prompts asynchronously at roughly 50% of on-demand pricing. Use it for offline workloads like document summarization, data enrichment, or nightly report generation where real-time response is not required.",
          tags: ["bedrock", "batch", "cost-optimization"],
        },
        {
          id: "m5-bedrock-cost-04",
          moduleId: "5",
          front:
            "What AWS service metric should you monitor to detect Bedrock cost anomalies?",
          back: "Monitor InputTokenCount and OutputTokenCount CloudWatch metrics per model ID. Set metric alarms and configure AWS Cost Anomaly Detection on the Bedrock service to catch unexpected token consumption spikes caused by prompt bugs or traffic surges.",
          tags: ["bedrock", "monitoring", "cloudwatch"],
        },
      ],
    },
    {
      id: "sagemaker-cost",
      title: "SageMaker Cost Optimization",
      estimatedMinutes: 12,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Instance Selection: Training vs Inference",
        },
        {
          type: "paragraph",
          text: "SageMaker workloads split into two distinct cost profiles: training (compute-intensive, time-bounded) and inference (latency-sensitive, continuous). Instance selection decisions for each phase have very different cost implications and optimization levers.",
        },
        {
          type: "table",
          headers: ["Workload", "Recommended Instances", "Key Cost Lever"],
          rows: [
            [
              "Large model training",
              "p4d.24xlarge, p5.48xlarge, trn1.32xlarge",
              "Spot + checkpointing",
            ],
            [
              "Fine-tuning",
              "p3.2xlarge, g5.xlarge",
              "Spot with automatic retry",
            ],
            [
              "Real-time inference",
              "g5.xlarge, g4dn.xlarge, inf2.xlarge",
              "Multi-model endpoints",
            ],
            [
              "Batch transform",
              "m5, c5 (CPU for small models)",
              "Right-size per batch size",
            ],
            [
              "Serverless inference",
              "Managed (pay per invocation)",
              "Idle cost elimination",
            ],
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Spot Instances for Training Jobs",
        },
        {
          type: "paragraph",
          text: "SageMaker Managed Spot Training enables training on EC2 Spot instances with automatic checkpointing and job resumption. Spot instances offer up to 90% savings over on-demand for training jobs. SageMaker handles Spot interruptions by saving checkpoints to S3 and resuming from the latest checkpoint when capacity becomes available.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Checkpoint Frequently",
          text: "Configure checkpoint intervals to match your acceptable re-work window. For a 10-hour training job, checkpointing every 30 minutes means a worst-case loss of 30 minutes of compute on interruption. This overhead is almost always worth the 70-90% Spot discount.",
        },
        {
          type: "heading",
          level: 3,
          text: "SageMaker Savings Plans",
        },
        {
          type: "paragraph",
          text: "SageMaker Savings Plans provide discounts of up to 64% in exchange for a commitment to a consistent hourly spend (measured in dollars per hour) over 1 or 3 years. Unlike instance-specific reservations, Savings Plans apply automatically across SageMaker instance families, regions, and components (training, inference, notebooks), making them flexible for evolving ML infrastructure.",
        },
        {
          type: "heading",
          level: 3,
          text: "Multi-Model Endpoints & Serverless Inference",
        },
        {
          type: "paragraph",
          text: "Multi-Model Endpoints (MME) host thousands of models on a single endpoint by dynamically loading models into memory on demand. MME is ideal for per-tenant or per-user model variants that cannot all fit in memory simultaneously. Serverless Inference eliminates idle instance costs entirely by scaling to zero between requests, charging only per invocation and memory-second consumed.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Serverless Inference Cold Start",
          text: "Serverless Inference cold starts can add 1-5 seconds for large models. For latency-sensitive applications, keep real-time endpoints warm or use Provisioned Concurrency. Serverless is best for low-traffic or development endpoints.",
        },
        {
          type: "bullet-list",
          items: [
            "Use SageMaker Savings Plans for any stable inference workload running 8+ hours/day",
            "Enable Managed Spot Training for all training jobs that support checkpointing",
            "Consolidate low-traffic models onto Multi-Model Endpoints to slash per-endpoint instance costs",
            "Use Serverless Inference for dev/test or infrequently invoked models",
            "Right-size inference instances: profile actual GPU/CPU utilization and downgrade underutilized endpoints",
            "Delete idle notebook instances and SageMaker Studio domains — they accrue charges when not in use",
          ],
        },
      ],
      flashcards: [
        {
          id: "m5-sagemaker-cost-01",
          moduleId: "5",
          front:
            "How does SageMaker Managed Spot Training handle interruptions?",
          back: "SageMaker saves training checkpoints to S3 at configured intervals. When a Spot interruption occurs, SageMaker waits for capacity and automatically resumes the job from the last checkpoint, so you only lose compute since the last checkpoint rather than restarting from scratch.",
          tags: ["sagemaker", "spot", "training"],
        },
        {
          id: "m5-sagemaker-cost-02",
          moduleId: "5",
          front:
            "What is the key flexibility advantage of SageMaker Savings Plans over Reserved Instances?",
          back: "SageMaker Savings Plans apply across instance families, sizes, regions, and SageMaker components (training, inference, notebooks) automatically. Reserved Instances lock you to a specific instance type and region, making Savings Plans far more practical for evolving ML workloads.",
          tags: ["sagemaker", "savings-plans", "reservations"],
        },
        {
          id: "m5-sagemaker-cost-03",
          moduleId: "5",
          front:
            "When should you choose a Multi-Model Endpoint over individual endpoints?",
          back: "Use Multi-Model Endpoints when you have many models (e.g., per-customer fine-tuned variants) that cannot all fit in memory simultaneously and have variable, non-overlapping traffic patterns. MME dynamically loads/unloads models from a shared instance, reducing total endpoint cost dramatically versus one instance per model.",
          tags: ["sagemaker", "multi-model", "inference"],
        },
        {
          id: "m5-sagemaker-cost-04",
          moduleId: "5",
          front:
            "What is the main cost trade-off with SageMaker Serverless Inference?",
          back: "Serverless Inference charges only per invocation and memory-second, eliminating idle instance costs and scaling to zero. The trade-off is cold start latency (1-5 seconds for large models). It is cost-optimal for infrequent or unpredictable traffic but unsuitable for latency-sensitive production endpoints with consistent load.",
          tags: ["sagemaker", "serverless", "inference"],
        },
      ],
    },
    {
      id: "ec2-for-ai",
      title: "EC2 for AI Workloads",
      estimatedMinutes: 10,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "GPU Instance Families for AI",
        },
        {
          type: "paragraph",
          text: "AWS offers purpose-built accelerated compute instance families for AI training and inference. Selecting the right family requires balancing cost per token (or cost per training step), memory bandwidth, and availability. Newer generations (P5, G6, Inf2, Trn1) offer significantly better price-performance than legacy P3/G4 instances.",
        },
        {
          type: "table",
          headers: [
            "Instance Family",
            "Accelerator",
            "Primary Use",
            "On-Demand (approx)",
          ],
          rows: [
            [
              "P5 (p5.48xlarge)",
              "8x H100 80GB",
              "LLM training, large-scale fine-tuning",
              "~$98/hr",
            ],
            [
              "P4d (p4d.24xlarge)",
              "8x A100 40GB",
              "Distributed training, research",
              "~$32/hr",
            ],
            [
              "G6 (g6.48xlarge)",
              "8x L4 GPU",
              "Inference, fine-tuning medium models",
              "~$16/hr",
            ],
            [
              "G5 (g5.48xlarge)",
              "8x A10G GPU",
              "Inference, training smaller models",
              "~$16/hr",
            ],
            [
              "Inf2 (inf2.48xlarge)",
              "12x AWS Inferentia2",
              "High-throughput LLM inference",
              "~$12/hr",
            ],
            [
              "Trn1 (trn1.32xlarge)",
              "16x AWS Trainium",
              "LLM pre-training & fine-tuning",
              "~$21/hr",
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Inferentia2 for Production Inference",
          text: "AWS Inferentia2 (Inf2) instances can deliver 50-70% lower cost per token versus equivalent GPU instances for deployed LLMs compiled with Neuron SDK. The compilation step adds upfront engineering work but yields substantial ongoing savings at inference scale.",
        },
        {
          type: "heading",
          level: 3,
          text: "Capacity Reservations for GPU Instances",
        },
        {
          type: "paragraph",
          text: "GPU instances — especially P5 and P4d — have limited regional availability. On-Demand Capacity Reservations (ODCR) guarantee access to specific instance types in a specific AZ, billed whether used or not. For time-critical training runs, ODCRs eliminate the risk of capacity unavailability. Pair ODCRs with Regional or Zonal Reserved Instances to offset the on-demand rate.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "GPU Spot Availability Is Volatile",
          text: "P4d and P5 Spot availability is highly constrained in most regions. Design training pipelines to checkpoint aggressively and use Spot where available, but have an on-demand fallback in your capacity procurement strategy for deadline-sensitive projects.",
        },
        {
          type: "heading",
          level: 3,
          text: "Spot for Fault-Tolerant Training",
        },
        {
          type: "paragraph",
          text: "For training workloads that support checkpointing, EC2 Spot can reduce GPU compute costs by 60-90%. Use EC2 Auto Scaling groups with mixed instance policies, combining Spot and on-demand base capacity. Implement elastic fabric adapter (EFA) for multi-node distributed training to minimize communication overhead and maximize GPU utilization.",
        },
        {
          type: "numbered-list",
          items: [
            "Benchmark your model on Inf2 using the Neuron SDK — compile once, save consistently",
            "Use Spot Fleet with capacity-optimized allocation strategy for training clusters",
            "Reserve P5/P4d capacity 4+ weeks ahead for planned large training runs",
            "Monitor GPU utilization with CloudWatch GPU metrics — underutilized GPUs are pure waste",
            "Consider Trn1 for pre-training large models from scratch — purpose-built and cost-competitive",
          ],
        },
      ],
      flashcards: [
        {
          id: "m5-ec2-for-ai-01",
          moduleId: "5",
          front:
            "Why might AWS Inferentia2 (Inf2) be cheaper than GPU instances for LLM inference?",
          back: "Inferentia2 is a purpose-built inference accelerator with high memory bandwidth and throughput for transformer workloads. After compiling models with Neuron SDK, Inf2 instances deliver 50-70% lower cost per token compared to equivalent GPU (G5/G6) instances, because the hardware is optimized specifically for inference rather than training.",
          tags: ["ec2", "inferentia", "inference", "cost"],
        },
        {
          id: "m5-ec2-for-ai-02",
          moduleId: "5",
          front:
            "What is an On-Demand Capacity Reservation (ODCR) and when is it essential for AI workloads?",
          back: "An ODCR reserves a specific EC2 instance type in a specific AZ, guaranteeing capacity availability. It is billed whether the capacity is used or not. ODCRs are essential for GPU instances like P5 and P4d where availability is constrained, ensuring training runs are not blocked by insufficient capacity at launch time.",
          tags: ["ec2", "capacity-reservation", "gpu"],
        },
        {
          id: "m5-ec2-for-ai-03",
          moduleId: "5",
          front:
            "What AWS Trainium instance offers for LLM training cost optimization?",
          back: "Trn1 instances use AWS Trainium accelerators, purpose-built for training deep learning models. They offer competitive price-performance for LLM pre-training and fine-tuning versus P4d, often at lower cost per training step. They require models to be compiled with the AWS Neuron SDK but deliver strong TCO for sustained training workloads.",
          tags: ["ec2", "trainium", "training", "cost"],
        },
        {
          id: "m5-ec2-for-ai-04",
          moduleId: "5",
          front:
            "What Spot allocation strategy should you use for GPU training clusters?",
          back: "Use the capacity-optimized Spot allocation strategy (not lowest-price) for GPU training clusters. This strategy selects Spot pools with the most available capacity, reducing interruption frequency — critical for long training runs. Combine with checkpointing and SageMaker Managed Spot Training or EC2 Auto Scaling with mixed instance types.",
          tags: ["ec2", "spot", "gpu", "training"],
        },
      ],
    },
    {
      id: "amazon-q-cost",
      title: "Amazon Q & AI Services Cost Management",
      estimatedMinutes: 8,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Amazon Q Business Pricing",
        },
        {
          type: "paragraph",
          text: "Amazon Q Business is AWS's enterprise AI assistant. It charges per user per month with two tiers: Q Business Lite (~$3/user/month) for basic Q&A and search, and Q Business Pro (~$20/user/month) for full generative AI capabilities including document creation, code assistance, and plugin integrations. Right-sizing user tier assignment is the primary cost lever.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Audit Active Users Monthly",
          text: "Amazon Q Business charges per active user. Audit usage monthly and downgrade or remove inactive users. In organizations with 1,000+ Q seats, unused Pro licenses represent $20,000+/month in waste. Integrate with your identity provider to automatically deprovision users who leave the organization.",
        },
        {
          type: "heading",
          level: 3,
          text: "Usage-Based AI Services: Comprehend, Rekognition, Transcribe",
        },
        {
          type: "paragraph",
          text: "AWS managed AI services (Comprehend, Rekognition, Transcribe, Translate, Polly) use consumption-based pricing with tiered volume discounts. Each service charges per unit processed (characters, images, minutes of audio, etc.) with no minimum fees. These services are operationally simple but can generate surprising costs when called in loops or without input validation.",
        },
        {
          type: "table",
          headers: ["Service", "Pricing Unit", "Key Cost Risk"],
          rows: [
            [
              "Comprehend",
              "Per 100 characters (min 3 units)",
              "Short-text calls inflate cost due to 300-char minimum",
            ],
            [
              "Rekognition",
              "Per image / per minute of video",
              "Repeated analysis of same images without caching",
            ],
            [
              "Transcribe",
              "Per second of audio",
              "Processing silence or background noise without VAD",
            ],
            [
              "Translate",
              "Per character translated",
              "Translating content users won't read",
            ],
            [
              "Polly",
              "Per character synthesized",
              "Re-synthesizing unchanged text instead of caching audio",
            ],
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Cost Tagging for AI Workloads",
        },
        {
          type: "paragraph",
          text: "AI/ML workloads often span multiple services (Bedrock, SageMaker, S3, ECR, VPC). Without consistent tagging, it is impossible to attribute costs to specific models, teams, or use cases. Establish a mandatory AI cost allocation taxonomy and enforce it with AWS Config rules and tag policies in AWS Organizations.",
        },
        {
          type: "bullet-list",
          items: [
            "Required tags for AI workloads: project, model-name, environment, cost-center, team",
            "Use AWS Budgets with tag filters to set per-project AI spend thresholds",
            "Configure AWS Cost Anomaly Detection on Bedrock, SageMaker, and managed AI services separately",
            "Implement AWS Service Quotas for Bedrock model invocations to enforce per-team limits",
            "Use Guardrails in Amazon Bedrock to block long or expensive prompt patterns",
          ],
        },
        {
          type: "callout",
          variant: "important",
          title: "Set Hard Limits Before Production Launch",
          text: "Generative AI applications can generate unbounded costs if users craft unusually long prompts or trigger recursive generation loops. Set Bedrock invocation rate limits, max token limits per request, and AWS Budgets actions that automatically restrict IAM permissions when a spend threshold is breached.",
        },
      ],
      flashcards: [
        {
          id: "m5-amazon-q-cost-01",
          moduleId: "5",
          front:
            "What is the pricing difference between Amazon Q Business Lite and Pro tiers?",
          back: "Amazon Q Business Lite (~$3/user/month) covers basic Q&A and search. Q Business Pro (~$20/user/month) includes full generative AI features: document creation, code assistance, and third-party plugin integrations. Assign users to the minimum tier that meets their workflow needs to minimize per-seat cost.",
          tags: ["amazon-q", "pricing", "saas"],
        },
        {
          id: "m5-amazon-q-cost-02",
          moduleId: "5",
          front:
            "Why can Amazon Comprehend be more expensive than expected for short text inputs?",
          back: "Comprehend charges a minimum of 3 units (300 characters) per API call, even for shorter inputs. If your application sends many short strings (e.g., single sentences or phrases), each call is billed as 300 characters regardless of actual length. Batch calls or pad/aggregate short inputs to avoid this overhead.",
          tags: ["comprehend", "pricing", "managed-ai"],
        },
        {
          id: "m5-amazon-q-cost-03",
          moduleId: "5",
          front:
            "What AWS mechanism can automatically restrict AI spend when a budget threshold is breached?",
          back: "AWS Budgets Actions can automatically apply IAM policies, Service Control Policies (SCPs), or target EC2/RDS actions when a budget threshold is exceeded. For AI workloads, configure a Budget Action that attaches a restrictive IAM policy to roles used for Bedrock or SageMaker invocations, effectively throttling further spend.",
          tags: ["budgets", "guardrails", "cost-control"],
        },
        {
          id: "m5-amazon-q-cost-04",
          moduleId: "5",
          front:
            "What five tags should be mandatory on all AI workload resources for cost allocation?",
          back: "The recommended mandatory tags are: project (the AI application or initiative name), model-name (the specific model being used), environment (dev/staging/prod), cost-center (finance attribution code), and team (owning team). Enforce these with AWS Config rules and Organizations tag policies to ensure complete cost visibility.",
          tags: ["tagging", "cost-allocation", "finops"],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m5-q1",
      text: "Which Bedrock pricing model provides the lowest per-token cost for a sustained, high-volume production workload running continuously throughout the day?",
      options: [
        "On-Demand pricing with no commitment",
        "Provisioned Throughput with a 1-month commitment",
        "Batch Inference for all requests",
        "Cross-region inference profiles",
      ],
      correctIndex: 1,
      explanation:
        "Provisioned Throughput purchases reserved model units at a fixed hourly rate, delivering lower per-token costs than on-demand for consistently high utilization. Batch Inference is 50% cheaper but requires asynchronous processing. Cross-region profiles improve availability but do not directly reduce cost. On-demand has no discount for sustained usage.",
    },
    {
      id: "m5-q2",
      text: "A data science team wants to train a large language model using EC2 Spot instances while minimizing interruption risk. Which Spot allocation strategy should they use?",
      options: [
        "Lowest-price allocation to minimize hourly rate",
        "Diversified allocation across all available instance types",
        "Capacity-optimized allocation to select pools with most available Spot capacity",
        "Price-capacity-optimized with a single instance pool",
      ],
      correctIndex: 2,
      explanation:
        "The capacity-optimized strategy selects Spot pools with the most available capacity, directly minimizing interruption probability. For GPU training jobs where interruptions are costly (even with checkpointing), capacity-optimized is strongly preferred over lowest-price, which optimizes cost at the expense of interruption frequency.",
    },
    {
      id: "m5-q3",
      text: "An ML team runs 50 different fine-tuned model variants, each serving a different customer. Traffic to each model is infrequent (a few requests per hour). What SageMaker deployment strategy minimizes cost?",
      options: [
        "50 separate real-time endpoints, one per model",
        "A single Multi-Model Endpoint hosting all 50 models",
        "SageMaker Serverless Inference with one endpoint per model",
        "SageMaker Batch Transform scheduled every 15 minutes",
      ],
      correctIndex: 1,
      explanation:
        "A Multi-Model Endpoint hosts all 50 models on a shared instance, dynamically loading models into memory on demand. This is the most cost-effective option for many models with infrequent, non-overlapping traffic. Separate endpoints would waste 50x the instance cost. Serverless avoids idle cost but would require 50 separate endpoints and may have cold start issues. Batch Transform adds latency unsuitable for interactive queries.",
    },
    {
      id: "m5-q4",
      text: "Which AWS Inferentia2 instance characteristic makes it cost-effective for LLM inference compared to GPU instances?",
      options: [
        "It supports larger batch sizes than any GPU instance",
        "It requires no model compilation, reducing engineering overhead",
        "It delivers high throughput for transformer inference at lower cost per token after Neuron SDK compilation",
        "It automatically distributes inference across multiple AWS regions",
      ],
      correctIndex: 2,
      explanation:
        "Inferentia2 is purpose-built for inference workloads and delivers 50-70% lower cost per token versus equivalent GPU instances for LLMs compiled with the Neuron SDK. The trade-off is the one-time compilation step required to target the Inferentia2 hardware. It does not require multi-region distribution, and compilation is required (not optional).",
    },
    {
      id: "m5-q5",
      text: "A company wants to prevent runaway costs from a new generative AI application. Which combination of controls provides the strongest cost guardrails?",
      options: [
        "Enable CloudTrail logging and review logs weekly",
        "Set AWS Budgets with budget actions to restrict IAM permissions, configure Bedrock invocation quotas, and enforce max token limits per request",
        "Use Reserved Instances for SageMaker and purchase Savings Plans",
        "Apply resource tags to all AI workloads and review Cost Explorer monthly",
      ],
      correctIndex: 1,
      explanation:
        "The strongest real-time guardrails combine: AWS Budgets Actions (automatically restrict IAM permissions when thresholds are breached), Bedrock Service Quotas (cap invocation rates per team/application), and per-request token limits (prevent individually expensive calls). Tagging and Cost Explorer provide visibility but are reactive. Reserved Instances and Savings Plans reduce cost but do not prevent overuse. CloudTrail is for security auditing, not cost control.",
    },
  ],
};
