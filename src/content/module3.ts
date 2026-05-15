import type { Module } from "../types/content";

export const module3: Module = {
  id: "3",
  title: "Cost Optimization Pt. 1",
  subtitle: "Compute, Storage & Databases",
  description:
    "Learn how to reduce costs across EC2, Lambda, S3, EBS, RDS, Aurora, DynamoDB, and ElastiCache using rightsizing, storage-class optimization, reserved capacity, and serverless scaling strategies.",
  icon: "Server",
  sections: [
    {
      id: "rightsizing-strategy",
      title: "The Rightsizing Strategy",
      estimatedMinutes: 14,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Building a Systematic Rightsizing Process",
        },
        {
          type: "paragraph",
          text: "Rightsizing is the discipline of matching EC2 instance type and size to the actual demands of your workload — not what you guessed you needed at launch. Industry surveys consistently find 30–50% of EC2 spend is on over-provisioned resources. A systematic process turns this waste into savings without compromising performance.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Why over-provisioning is the default",
          text: "When engineers provision instances, they typically add a 2–4x safety buffer to avoid being paged at 3am. This is rational at the individual level but catastrophically expensive at the organizational level. A 4x buffer on a $100,000/month EC2 bill means $75,000/month in waste.",
        },
        {
          type: "heading",
          level: 3,
          text: "Step 1: Collect a Representative Baseline",
        },
        {
          type: "paragraph",
          text: "CloudWatch captures EC2 CPU utilization by default at 5-minute granularity at no charge. **Detailed monitoring** (1-minute granularity) costs $3.50/instance/month but is required for responsive Auto Scaling and accurate rightsizing. The minimum observation window is **14 days** — long enough to capture weekly business cycles. For seasonal workloads, observe 4–8 weeks.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Default CloudWatch does not capture memory or disk",
          text: "The EC2 hypervisor cannot see inside the guest OS, so CloudWatch does not report memory utilization, disk utilization, or swap by default. Install the **CloudWatch Agent** (free) on every instance to capture these metrics. Without memory data, Compute Optimizer will use lower-confidence recommendations — look for the 'Insufficient data' label in its console.",
        },
        {
          type: "heading",
          level: 3,
          text: "Step 2: Understand Utilization Percentiles",
        },
        {
          type: "paragraph",
          text: "Averages lie. An instance might average 15% CPU while hitting 95% during a daily batch job that takes 30 minutes. Using average CPU to rightsize would cause you to under-provision for that spike. **Percentile analysis** is the correct approach: p99 CPU tells you the peak that 99% of observations fall below.",
        },
        {
          type: "table",
          headers: ["Metric", "What it tells you", "How to use it"],
          rows: [
            [
              "Average CPU",
              "Baseline load trend",
              "Context only — never use alone for rightsizing",
            ],
            [
              "p90 CPU",
              "Load 90% of the time is below this",
              "Size for p90 if occasional spikes are tolerable",
            ],
            [
              "p99 CPU",
              "Load 99% of the time is below this",
              "Use for production workloads with SLA requirements",
            ],
            [
              "Maximum CPU",
              "Absolute peak observed",
              "Sanity check — one spike does not define the workload",
            ],
            [
              "p99 Memory",
              "Memory high-water mark (99th percentile)",
              "Critical for memory-optimized rightsizing",
            ],
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Step 3: AWS Compute Optimizer Recommendations",
        },
        {
          type: "paragraph",
          text: "**AWS Compute Optimizer** ingests up to 14 days of CloudWatch metrics and applies an ML model to generate rightsizing recommendations for EC2, Auto Scaling groups, EBS volumes, Lambda functions, and ECS on Fargate. Recommendations include a risk label (over-provisioned, under-provisioned, optimized) and projected monthly savings.",
        },
        {
          type: "numbered-list",
          items: [
            "Enable Compute Optimizer at the AWS Organizations management account to cover all member accounts automatically.",
            "Opt into Enhanced Infrastructure Metrics (costs ~$0.0033/resource/hour) to extend the observation window to 3 months — essential for workloads with monthly cycles.",
            "Review the 'Finding reason codes' for each recommendation — they explain which metric (CPU, memory, network, EBS IOPS) drove the recommendation.",
            "Filter recommendations by 'Over-provisioned' and sort by 'Monthly savings' to prioritize the highest-impact actions.",
            "Export recommendations via the Compute Optimizer API or S3 export for automated workflows and reporting.",
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Step 4: Instance Family Selection",
        },
        {
          type: "table",
          headers: [
            "Family",
            "Optimized For",
            "Example Types",
            "Typical Use Cases",
          ],
          rows: [
            [
              "General Purpose (M/T)",
              "Balanced CPU/memory (1:4 vCPU:GB ratio)",
              "m7i, m7g, t3, t4g",
              "Web servers, app servers, microservices, small databases",
            ],
            [
              "Compute Optimized (C)",
              "High CPU, less memory (1:2 ratio)",
              "c7i, c7g, c6a",
              "Batch jobs, video transcoding, high-traffic web frontends, gaming servers",
            ],
            [
              "Memory Optimized (R/X)",
              "High memory, lower CPU (1:8+ ratio)",
              "r7i, r7g, x2idn",
              "In-memory databases, SAP HANA, real-time analytics, Redis with large datasets",
            ],
            [
              "Storage Optimized (I/D)",
              "High sequential or random I/O",
              "i4i, im4gn, d3en",
              "Cassandra, MongoDB, HDFS, high-throughput log ingestion",
            ],
            [
              "Accelerated (P/G/Inf)",
              "GPU or custom silicon",
              "p4d, g5, inf2",
              "ML training, ML inference, HPC, graphics rendering",
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Graviton3 instances deliver the best price/performance",
          text: "AWS Graviton3 (m7g, c7g, r7g) instances are 20–40% cheaper than equivalent x86 Intel/AMD instances for the same workload throughput. They require that your software runs on ARM64. Most managed runtimes (Java, Python, Node.js, Go, .NET) and Docker images built for linux/arm64 work without changes. Run a 2-week shadow test before migrating production.",
        },
        {
          type: "heading",
          level: 3,
          text: "Step 5: Deploy, Monitor, and Repeat",
        },
        {
          type: "numbered-list",
          items: [
            "Test in staging: launch the rightsized instance type with a production-equivalent workload for 48–72 hours.",
            "Deploy with blue/green or rolling update via Auto Scaling group instance refresh — never in-place for critical services.",
            "Set a CloudWatch alarm on p99 CPU > 85% for 15 minutes as an early warning that the new size is too small.",
            "Review again after 90 days — workloads grow and AWS releases new instance generations regularly.",
          ],
        },
      ],
      flashcards: [
        {
          id: "m3-rightsizing-strategy-01",
          moduleId: "3",
          front:
            "Why should you use p99 CPU instead of average CPU when rightsizing EC2 instances?",
          back: "Averages hide spikes. An instance averaging 15% CPU might hit 95% for 30 minutes daily during batch jobs. p99 CPU tells you the load threshold that 99% of observations fall below, ensuring you size for actual peak demand rather than a misleading average.",
          tags: ["ec2", "rightsizing", "cloudwatch", "percentiles"],
        },
        {
          id: "m3-rightsizing-strategy-02",
          moduleId: "3",
          front:
            "What metrics does default CloudWatch NOT capture for EC2, and how do you get them?",
          back: "Default CloudWatch does not capture memory utilization, disk utilization, or swap — the hypervisor cannot see inside the guest OS. Install the CloudWatch Agent (free) on each instance to collect these OS-level metrics. Without them, Compute Optimizer issues lower-confidence recommendations.",
          tags: ["ec2", "cloudwatch", "rightsizing", "compute-optimizer"],
        },
        {
          id: "m3-rightsizing-strategy-03",
          moduleId: "3",
          front:
            "What does enabling Enhanced Infrastructure Metrics in Compute Optimizer change?",
          back: "It extends the CloudWatch metric observation window from 14 days to 3 months. This is important for workloads with monthly billing cycles, end-of-month spikes, or other patterns not visible in 2 weeks. It costs approximately $0.0033 per resource per hour.",
          tags: ["compute-optimizer", "rightsizing", "metrics"],
        },
        {
          id: "m3-rightsizing-strategy-04",
          moduleId: "3",
          front:
            "Which EC2 instance family has a 1:2 vCPU:GB memory ratio and is best for compute-heavy workloads?",
          back: "Compute Optimized (C family: c7i, c7g, c6a). With a 1:2 ratio, these instances provide more CPU per dollar than general-purpose M instances (1:4 ratio) for workloads that are CPU-bound rather than memory-bound, like video encoding, batch processing, and high-traffic web frontends.",
          tags: ["ec2", "instance-families", "compute-optimized"],
        },
        {
          id: "m3-rightsizing-strategy-05",
          moduleId: "3",
          front:
            "How much cheaper are Graviton3 instances compared to equivalent x86 instances?",
          back: "AWS Graviton3 (m7g, c7g, r7g) instances are typically 20–40% cheaper than equivalent Intel or AMD x86 instances for the same workload throughput. They require ARM64-compatible software but most managed runtimes and Docker images built for linux/arm64 work without code changes.",
          tags: ["ec2", "graviton", "arm64", "cost"],
        },
      ],
    },
    {
      id: "ec2-pricing-options",
      title: "EC2 Pricing Deep Dive",
      estimatedMinutes: 16,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "EC2 Purchase Options: On-Demand, Reserved, Savings Plans, and Spot",
        },
        {
          type: "paragraph",
          text: "EC2 instance pricing has four distinct purchase models. Choosing the right model — or the right mix — is often the single highest-impact cost action a team can take. A workload running 24/7 on On-Demand that could run on Reserved Instances is paying 2–3x what it needs to.",
        },
        {
          type: "table",
          headers: [
            "Purchase Model",
            "m5.xlarge us-east-1 $/hr",
            "Vs On-Demand",
            "Commitment",
            "Best For",
          ],
          rows: [
            [
              "On-Demand",
              "$0.192/hr",
              "Baseline",
              "None",
              "Unpredictable, short-term, dev/test",
            ],
            [
              "1-yr No Upfront RI",
              "$0.118/hr",
              "-38%",
              "1 year",
              "Steady-state production workloads",
            ],
            [
              "1-yr All Upfront RI",
              "$0.113/hr",
              "-41%",
              "1 year",
              "Higher savings vs No Upfront",
            ],
            [
              "3-yr All Upfront RI",
              "$0.076/hr",
              "-60%",
              "3 years",
              "Maximum savings, stable workloads",
            ],
            [
              "Compute Savings Plan",
              "$0.118/hr",
              "-38%",
              "1–3 years",
              "Flexible instance family/region/OS",
            ],
            [
              "EC2 Instance Savings Plan",
              "$0.109/hr",
              "-43%",
              "1–3 years",
              "Single family, higher savings",
            ],
            [
              "Spot Instance",
              "~$0.04–0.07/hr",
              "~60–80%",
              "None (interruptible)",
              "Stateless, batch, fault-tolerant",
            ],
          ],
        },
        {
          type: "callout",
          variant: "important",
          title: "Real numbers: m5.xlarge 24/7 for one year",
          text: "On-Demand: $0.192 × 8,760 hrs = $1,682/year. 3-yr All Upfront RI: $0.076 × 8,760 = $666/year. Savings: $1,016/year per instance. A fleet of 50 m5.xlarge instances saves $50,800/year just from RIs — with zero changes to the application.",
        },
        {
          type: "heading",
          level: 3,
          text: "Reserved Instances: Standard vs Convertible",
        },
        {
          type: "paragraph",
          text: "**Standard RIs** lock you to a specific instance family, size, OS, tenancy, and region. They offer the highest discounts (up to 60%) but are rigid. **Convertible RIs** allow you to change the instance type, OS, or tenancy during the term, at a lower discount (up to 54%). Convertible RIs can be exchanged for newer instance generations as AWS releases them.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Buy Standard RIs for your base, Convertibles for uncertainty",
          text: "Layer your RI strategy: buy Standard RIs for your guaranteed, stable workloads (e.g., always-on production databases), and Convertible RIs for workloads where the instance type might change as your architecture evolves. Never buy RIs for workloads you are still optimizing.",
        },
        {
          type: "heading",
          level: 3,
          text: "Savings Plans: Compute vs EC2 Instance",
        },
        {
          type: "paragraph",
          text: "Savings Plans are a commitment to spend a minimum $/hr amount, automatically applied to matching usage. **Compute Savings Plans** apply across any instance family, region, OS, and even Fargate and Lambda — maximum flexibility at up to 66% discount. **EC2 Instance Savings Plans** lock to a specific instance family and region but offer deeper discounts (up to 72%).",
        },
        {
          type: "table",
          headers: [
            "Attribute",
            "Compute Savings Plan",
            "EC2 Instance Savings Plan",
          ],
          rows: [
            [
              "Applies to",
              "EC2, Fargate, Lambda",
              "EC2 only (specific family)",
            ],
            [
              "Instance family flexibility",
              "Any",
              "Locked (e.g., M5 in us-east-1)",
            ],
            ["Region flexibility", "Any", "Locked"],
            ["Max discount (vs On-Demand)", "~66%", "~72%"],
            [
              "Best for",
              "Multi-region, mixed fleets, Fargate users",
              "Single-family steady workloads",
            ],
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Spot Instances: Break-Even and Interruption Handling",
        },
        {
          type: "paragraph",
          text: "Spot Instances use spare EC2 capacity and can be 60–90% cheaper than On-Demand. They can be interrupted with a **2-minute warning** when EC2 needs the capacity back. The interruption rate varies by instance type and AZ — popular instance types in busy AZs have higher interruption rates. Check the Spot Instance Advisor for historical interruption frequency data.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Spot is not free money — design for interruption",
          text: "Spot Instance savings are real, but only if your application handles interruption correctly. Stateful applications (single-instance databases, session-full web servers) will lose data or fail on interruption. Use Spot only for stateless, fault-tolerant, or checkpointed workloads. Mix Spot with On-Demand in Auto Scaling groups using a base + Spot capacity provider strategy.",
        },
        {
          type: "heading",
          level: 3,
          text: "RI Break-Even Analysis",
        },
        {
          type: "paragraph",
          text: "An instance running less than 100% of the time may not need a full RI. Calculate the break-even utilization: **Break-even % = RI effective $/hr ÷ On-Demand $/hr**. For a 1-yr No Upfront RI at $0.118/hr vs On-Demand $0.192/hr: break-even = 0.118/0.192 = 61%. If the instance runs more than 61% of the time on average, the RI saves money.",
        },
        {
          type: "numbered-list",
          items: [
            "Pull 3 months of Cost Explorer data to find the average hourly usage of the instance type.",
            "Calculate the break-even utilization threshold for the RI term you are considering.",
            "If average usage exceeds break-even, purchase the RI.",
            "If usage is below break-even, consider On-Demand or Spot.",
            "List unused RIs on the Reserved Instance Marketplace to sell commitments you no longer need.",
          ],
        },
      ],
      flashcards: [
        {
          id: "m3-ec2-pricing-options-01",
          moduleId: "3",
          front:
            "What is the approximate On-Demand hourly price for an m5.xlarge in us-east-1, and how much does a 3-year All Upfront RI save?",
          back: "On-Demand: $0.192/hr. 3-year All Upfront RI: $0.076/hr — approximately 60% savings. Over one year (8,760 hours), this saves approximately $1,016 per instance.",
          tags: ["ec2", "pricing", "reserved-instances", "m5"],
        },
        {
          id: "m3-ec2-pricing-options-02",
          moduleId: "3",
          front:
            "What is the key difference between Compute Savings Plans and EC2 Instance Savings Plans?",
          back: "Compute Savings Plans apply to any EC2 instance family, region, OS, and also to Fargate and Lambda — offering up to 66% savings. EC2 Instance Savings Plans lock to a specific instance family and region but offer higher discounts up to 72%. Use Compute SP for flexibility, EC2 Instance SP for maximum savings on stable workloads.",
          tags: ["savings-plans", "ec2", "pricing", "commitment"],
        },
        {
          id: "m3-ec2-pricing-options-03",
          moduleId: "3",
          front:
            "How do you calculate the break-even utilization for a Reserved Instance?",
          back: "Break-even % = RI effective hourly cost ÷ On-Demand hourly cost. Example: 1-yr No Upfront RI at $0.118/hr vs On-Demand $0.192/hr → 0.118/0.192 = 61%. If the instance runs more than 61% of the time on average, the RI saves money over On-Demand.",
          tags: ["ec2", "reserved-instances", "break-even", "pricing"],
        },
        {
          id: "m3-ec2-pricing-options-04",
          moduleId: "3",
          front:
            "What is the Spot Instance interruption warning period and what should you do with it?",
          back: "EC2 provides a 2-minute interruption notice via the instance metadata service (IMDS) and EventBridge before terminating a Spot Instance. Use this time to drain connections, flush checkpoints, deregister from load balancers, and write any in-flight state to durable storage.",
          tags: ["ec2", "spot", "interruption", "fault-tolerance"],
        },
        {
          id: "m3-ec2-pricing-options-05",
          moduleId: "3",
          front:
            "What is the difference between a Standard RI and a Convertible RI?",
          back: "Standard RIs lock to a specific instance family, size, OS, tenancy, and region — up to 60% discount. Convertible RIs allow you to exchange the instance type, OS, or tenancy during the term — up to 54% discount. Use Convertible RIs when architecture may evolve or when you want flexibility to adopt new instance generations.",
          tags: ["ec2", "reserved-instances", "standard", "convertible"],
        },
      ],
    },
    {
      id: "lambda-cost",
      title: "Lambda Cost Optimization",
      estimatedMinutes: 12,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Lambda Pricing Model",
        },
        {
          type: "paragraph",
          text: "Lambda charges on two dimensions: **number of requests** ($0.20 per 1M requests after the free tier of 1M/month) and **duration** measured in GB-seconds. Duration = memory allocated in GB × execution time in seconds, billed in 1ms increments. The free tier grants 400,000 GB-seconds per month.",
        },
        {
          type: "table",
          headers: [
            "Dimension",
            "x86 Rate (us-east-1)",
            "ARM Rate (us-east-1)",
            "Free Tier",
          ],
          rows: [
            [
              "Requests",
              "$0.20 / 1M requests",
              "$0.20 / 1M requests",
              "1M requests/month",
            ],
            [
              "Duration",
              "$0.0000166667 / GB-sec",
              "$0.0000133334 / GB-sec",
              "400,000 GB-sec/month",
            ],
            [
              "Provisioned Concurrency",
              "$0.0000041667 / GB-sec (always-on)",
              "$0.0000031250 / GB-sec",
              "None",
            ],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Real cost example: 10M invocations at 512 MB, 100ms",
          text: "Duration: 10M × 0.5 GB × 0.1 sec = 500,000 GB-sec. Cost: 500,000 × $0.0000166667 = $8.33. Requests: 10M × $0.20/1M = $2.00. Total: $10.33/month. Switching to ARM reduces duration cost to $6.67, saving $1.66/month — or $20/year per function at this scale.",
        },
        {
          type: "heading",
          level: 3,
          text: "Memory vs Duration: The Core Trade-off",
        },
        {
          type: "paragraph",
          text: "Memory allocation in Lambda also controls the proportion of vCPU allocated to the function. At 128 MB, a function gets a fraction of a vCPU. At 1,769 MB, it gets exactly 1 full vCPU. At 3,008 MB, it gets 2 vCPUs. For **CPU-bound** functions, more memory means faster execution — and the duration reduction can more than offset the higher memory cost.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Classic example: 128 MB vs 512 MB for a CPU-bound function",
          text: "At 128 MB / 2,000ms: 0.125 GB × 2.0 s = 0.25 GB-sec per invocation. At 512 MB / 400ms: 0.5 GB × 0.4 s = 0.20 GB-sec per invocation — 20% cheaper AND 5x faster. This is why memory tuning is essential before setting production memory allocation.",
        },
        {
          type: "heading",
          level: 3,
          text: "Lambda Power Tuning Tool",
        },
        {
          type: "paragraph",
          text: "**AWS Lambda Power Tuning** is an open-source AWS Step Functions state machine available from the Serverless Application Repository. You provide your function ARN, a list of memory sizes to test, and a number of invocations. It runs your function at each memory setting, measures duration, calculates GB-seconds cost, and visualizes the cost-performance curve.",
        },
        {
          type: "numbered-list",
          items: [
            "Deploy Lambda Power Tuning via SAR: search for 'lambda-power-tuning' in the Serverless Application Repository.",
            "Invoke the state machine with your function ARN, payload, memory values (e.g., [128, 256, 512, 1024, 2048, 3008]), and strategy ('cost', 'speed', or 'balanced').",
            "Review the visualization output — look for the 'cost' curve minimum.",
            "Update your function's memory setting to the optimal value.",
            "Re-run Power Tuning after significant code changes — algorithm changes shift the optimal memory point.",
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "ARM/Graviton2 Lambda: 20% Discount",
        },
        {
          type: "paragraph",
          text: "Switching from `x86_64` to `arm64` (Graviton2) reduces Lambda duration pricing by **~20%** — from $0.0000166667 to $0.0000133334 per GB-second. The change requires setting `Architectures: [arm64]` in the function configuration. Most runtimes (Node.js, Python, Java, Go, Ruby, .NET) support arm64. Any native binaries or compiled Lambda layers must be rebuilt for ARM.",
        },
        {
          type: "heading",
          level: 3,
          text: "Provisioned Concurrency: When It's Worth It",
        },
        {
          type: "paragraph",
          text: "Provisioned Concurrency eliminates cold starts by pre-warming execution environments. You pay $0.0000041667 per GB-second even when no requests are in flight. This is about 25% of the on-demand duration price but is continuous. It is cost-effective only when cold start latency causes measurable user or business impact AND the function receives frequent enough traffic that warm environments are always occupied.",
        },
        {
          type: "callout",
          variant: "warning",
          title:
            "Provisioned Concurrency can cost more than the function itself",
          text: "A function configured with 10 Provisioned Concurrency instances at 1024 MB runs 24/7: 10 × 1 GB × 86,400 sec × $0.0000041667 = $36/day, $1,080/month — whether or not it receives requests. Schedule Provisioned Concurrency with Application Auto Scaling to match traffic hours and save 50–70% of the idle cost.",
        },
      ],
      flashcards: [
        {
          id: "m3-lambda-cost-01",
          moduleId: "3",
          front:
            "What are the two Lambda billing dimensions and what is the GB-second rate for x86 in us-east-1?",
          back: "1) Requests: $0.20 per 1M (free tier: 1M/month). 2) Duration in GB-seconds: $0.0000166667 per GB-second for x86 (free tier: 400,000 GB-sec/month), billed in 1ms increments.",
          tags: ["lambda", "pricing", "gb-seconds"],
        },
        {
          id: "m3-lambda-cost-02",
          moduleId: "3",
          front:
            "How much cheaper is Lambda ARM (Graviton2) duration pricing vs x86, and what is required to use it?",
          back: "ARM is approximately 20% cheaper: $0.0000133334/GB-sec vs $0.0000166667/GB-sec. To use it, set Architectures: [arm64] in the function configuration. Any native binaries or compiled Lambda layers must be rebuilt for ARM64.",
          tags: ["lambda", "graviton", "arm64", "cost"],
        },
        {
          id: "m3-lambda-cost-03",
          moduleId: "3",
          front: "What is Lambda Power Tuning and how do you deploy it?",
          back: "An open-source Step Functions state machine that runs your Lambda function at multiple memory configurations and returns the optimal setting for cost, speed, or a balance. Deploy it from the AWS Serverless Application Repository by searching 'lambda-power-tuning'. Invoke it with your function ARN, memory list, and strategy.",
          tags: ["lambda", "power-tuning", "optimization"],
        },
        {
          id: "m3-lambda-cost-04",
          moduleId: "3",
          front:
            "At what memory level does a Lambda function get exactly 1 full vCPU?",
          back: "At 1,769 MB. Below this, the function has a fractional vCPU share. At 3,008 MB it gets 2 vCPUs. For CPU-bound functions, allocating 1,769 MB or above can dramatically reduce duration and may result in lower total GB-second cost.",
          tags: ["lambda", "memory", "vcpu", "optimization"],
        },
        {
          id: "m3-lambda-cost-05",
          moduleId: "3",
          front:
            "What is the Provisioned Concurrency GB-second rate and when is it NOT cost-effective?",
          back: "Provisioned Concurrency costs $0.0000041667 per GB-second for x86 (ARM: $0.0000031250), charged continuously regardless of invocations. It is not cost-effective for sporadic or bursty workloads where warm environments sit idle between bursts, because the idle cost exceeds the business value of reduced cold starts.",
          tags: ["lambda", "provisioned-concurrency", "cost"],
        },
      ],
    },
    {
      id: "storage-s3",
      title: "S3 Storage Classes & Lifecycle",
      estimatedMinutes: 14,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "S3 Storage Classes: Matching Cost to Access Pattern",
        },
        {
          type: "paragraph",
          text: "Amazon S3 Standard costs $0.023/GB-month — the most expensive class and the wrong choice for most long-lived data. Moving data to cheaper storage classes based on access frequency is one of the highest-leverage S3 cost actions, especially as datasets grow to terabyte or petabyte scale.",
        },
        {
          type: "table",
          headers: [
            "Storage Class",
            "Storage $/GB-month",
            "Min Duration",
            "Retrieval Fee",
            "Best For",
          ],
          rows: [
            [
              "S3 Standard",
              "$0.023",
              "None",
              "None",
              "Frequently accessed, <30 days old",
            ],
            [
              "S3 Standard-IA",
              "$0.0125",
              "30 days",
              "$0.01/GB retrieved",
              "Infrequent access, backup, disaster recovery",
            ],
            [
              "S3 One Zone-IA",
              "$0.01",
              "30 days",
              "$0.01/GB retrieved",
              "Reproducible data, single-AZ acceptable",
            ],
            [
              "S3 Intelligent-Tiering",
              "$0.023 (FA) / $0.0125 (IA)",
              "None",
              "None",
              "Unknown or variable access patterns",
            ],
            [
              "S3 Glacier Instant Retrieval",
              "$0.004",
              "90 days",
              "$0.03/GB retrieved",
              "Archive with ms retrieval needed",
            ],
            [
              "S3 Glacier Flexible Retrieval",
              "$0.0036",
              "90 days",
              "$0.01/GB + restore time",
              "Backup archives, 1–12 hr retrieval OK",
            ],
            [
              "S3 Glacier Deep Archive",
              "$0.00099",
              "180 days",
              "$0.02/GB + 12+ hr",
              "Compliance records, 7+ year retention",
            ],
          ],
        },
        {
          type: "callout",
          variant: "important",
          title: "Glacier Deep Archive is 23x cheaper than Standard",
          text: "$0.00099/GB vs $0.023/GB. A 100 TB archive stored in Standard costs $2,300/month. In Deep Archive: $99/month — saving $2,201/month, $26,412/year. The trade-off: 12–48 hour retrieval time and a 180-day minimum storage duration that incurs charges if objects are deleted early.",
        },
        {
          type: "heading",
          level: 3,
          text: "S3 Intelligent-Tiering: The Safe Default",
        },
        {
          type: "paragraph",
          text: "S3 Intelligent-Tiering automatically moves objects between four tiers based on access patterns: Frequent Access (Standard pricing), Infrequent Access (Standard-IA pricing after 30 days of no access), Archive Instant Access (Glacier Instant pricing after 90 days), and Archive Access (optional, Glacier Flexible pricing after 90–180 days). There are no retrieval charges within the automatic tiers.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Intelligent-Tiering has a per-object monitoring fee",
          text: "Intelligent-Tiering charges $0.0025 per 1,000 objects per month for access monitoring. Objects smaller than 128 KB are never tiered — they remain at Frequent Access pricing. For buckets with millions of small objects (thumbnails, JSON records), the monitoring fee may exceed storage savings. Calculate: monthly monitoring fee = (object count / 1000) × $0.0025.",
        },
        {
          type: "heading",
          level: 3,
          text: "S3 Lifecycle Policies: Automating Tier Transitions",
        },
        {
          type: "paragraph",
          text: "Lifecycle rules automate object transitions and deletions based on object age or prefix/tag. They run daily and apply to new and existing objects. Transition rules and expiration rules can be combined in a single policy.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Example lifecycle policy for application logs",
          text: "A typical log bucket policy: Day 0–30 → Standard (full access). Day 30–90 → Standard-IA (access is rare, 54% cost reduction). Day 90–365 → Glacier Flexible Retrieval (archive, 84% cost reduction from Standard). Day 365+ → Delete. This policy alone reduces year-two log storage costs by ~95% vs leaving everything in Standard.",
        },
        {
          type: "numbered-list",
          items: [
            "Navigate to the S3 bucket → Management → Lifecycle rules → Create lifecycle rule.",
            "Apply to all objects or filter by prefix (e.g., 'logs/') or tag.",
            "Add transition actions: specify the target class and minimum object age.",
            "Add expiration action: specify age in days after which objects (and delete markers) are deleted.",
            "Enable 'Clean up incomplete multipart uploads' — a separate action that deletes failed upload parts after a configurable number of days.",
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "S3 Storage Lens: Organization-Wide Visibility",
        },
        {
          type: "paragraph",
          text: "**S3 Storage Lens** provides aggregated metrics across all buckets and accounts in your organization. The free tier includes 28 usage and activity metrics. Advanced metrics ($0.20/million objects/month) add recommendations, activity metrics, and CloudWatch publishing. Key metrics to monitor include: StorageBytes by storage class, IncompleteMPUStorageBytes (wasted multipart upload storage), and NonCurrentVersionStorageBytes (versioned objects not cleaned up).",
        },
      ],
      flashcards: [
        {
          id: "m3-storage-s3-01",
          moduleId: "3",
          front:
            "What is the per-GB-month cost for S3 Standard vs S3 Glacier Deep Archive, and how much does 100 TB cost in each?",
          back: "Standard: $0.023/GB-month → 100 TB = $2,300/month. Glacier Deep Archive: $0.00099/GB-month → 100 TB = $99/month. Deep Archive is ~23x cheaper but has 12–48 hour retrieval time and a 180-day minimum storage duration.",
          tags: ["s3", "storage-classes", "pricing", "glacier"],
        },
        {
          id: "m3-storage-s3-02",
          moduleId: "3",
          front:
            "What is the S3 Intelligent-Tiering per-object monitoring fee, and which objects are never tiered?",
          back: "$0.0025 per 1,000 objects per month. Objects smaller than 128 KB are never moved between tiers — they remain at Frequent Access (Standard) pricing. For buckets with many small objects, calculate whether monitoring fees exceed storage savings before enabling IT.",
          tags: ["s3", "intelligent-tiering", "monitoring-fee", "cost"],
        },
        {
          id: "m3-storage-s3-03",
          moduleId: "3",
          front:
            "What are the four storage tiers in S3 Intelligent-Tiering and when does each activate?",
          back: "1) Frequent Access — Standard pricing, always active. 2) Infrequent Access — Standard-IA pricing, after 30 consecutive days of no access. 3) Archive Instant Access — Glacier Instant pricing, after 90 days. 4) Archive Access (optional) — Glacier Flexible pricing, after 90–180 days. No retrieval fees within automatic tiers.",
          tags: ["s3", "intelligent-tiering", "tiers"],
        },
        {
          id: "m3-storage-s3-04",
          moduleId: "3",
          front:
            "What is the minimum storage duration for S3 Standard-IA, and what happens if you delete an object before it?",
          back: "30 days. If you delete, overwrite, or transition an object to another class before 30 days, you are charged for the remaining minimum storage duration. This makes Standard-IA cost-ineffective for frequently changing or short-lived data.",
          tags: ["s3", "standard-ia", "minimum-duration", "cost"],
        },
        {
          id: "m3-storage-s3-05",
          moduleId: "3",
          front:
            "What does 'Clean up incomplete multipart uploads' in an S3 lifecycle rule do?",
          back: "It deletes the partial data from failed or abandoned multipart uploads after a configurable number of days. Failed multipart uploads accumulate silently and are charged at Standard storage rates. Use S3 Storage Lens NonCurrentVersionStorageBytes and IncompleteMPUStorageBytes metrics to quantify this waste.",
          tags: ["s3", "lifecycle", "multipart-upload", "cost"],
        },
      ],
    },
    {
      id: "ebs-optimization",
      title: "EBS Volume Optimization",
      estimatedMinutes: 12,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "EBS Volume Types: gp2 vs gp3 and Beyond",
        },
        {
          type: "paragraph",
          text: "Amazon EBS offers six volume types optimized for different performance and cost profiles. The most impactful decision for most workloads is migrating from legacy **gp2** to **gp3** — a change that reduces cost by approximately 20% while improving flexibility and often performance.",
        },
        {
          type: "table",
          headers: [
            "Volume Type",
            "Price/GB-month",
            "Baseline IOPS",
            "Max IOPS",
            "Max Throughput",
            "Use Case",
          ],
          rows: [
            [
              "gp3 (SSD)",
              "$0.08",
              "3,000 (free)",
              "16,000 ($0.005/IOPS)",
              "1,000 MB/s",
              "General purpose — default for most workloads",
            ],
            [
              "gp2 (SSD, legacy)",
              "$0.10",
              "3 IOPS/GB (min 100)",
              "16,000",
              "250 MB/s",
              "Legacy — migrate to gp3",
            ],
            [
              "io2 Block Express",
              "$0.125 + $0.065/IOPS",
              "Provisioned",
              "256,000",
              "4,000 MB/s",
              "Critical databases requiring sub-ms latency",
            ],
            [
              "io1 (legacy)",
              "$0.125 + $0.065/IOPS",
              "Provisioned",
              "64,000",
              "1,000 MB/s",
              "Legacy — migrate to io2",
            ],
            [
              "st1 (HDD)",
              "$0.045",
              "N/A (throughput)",
              "500 MB/s",
              "500 MB/s",
              "Sequential big-data, log processing, Hadoop",
            ],
            [
              "sc1 (HDD)",
              "$0.015",
              "N/A (throughput)",
              "250 MB/s",
              "250 MB/s",
              "Cold data, infrequent access, archives",
            ],
          ],
        },
        {
          type: "callout",
          variant: "important",
          title: "gp2 vs gp3: the IOPS trap",
          text: "With gp2, IOPS scale at 3 IOPS per GB with a minimum of 100. To get 3,000 IOPS from gp2, you need a 1,000 GB volume — even if your actual data is only 50 GB. With gp3, you get 3,000 IOPS on any size volume, and you pay only $0.08/GB vs $0.10/GB. A 50 GB gp2 volume at 150 IOPS costs $5/month. The same 50 GB as gp3 with 3,000 IOPS costs $4/month — cheaper AND 20x more IOPS.",
        },
        {
          type: "heading",
          level: 3,
          text: "Migrating gp2 Volumes to gp3",
        },
        {
          type: "paragraph",
          text: "EBS volume type can be changed live without stopping the instance using the **ModifyVolume** API. The modification takes time (typically 15–60 minutes) and the volume remains fully operational throughout. You can also change volume size and IOPS in the same operation.",
        },
        {
          type: "numbered-list",
          items: [
            "Identify gp2 volumes: use AWS CLI or Cost Explorer to list all EBS volumes with type gp2.",
            "Check current IOPS requirements: query CloudWatch `VolumeReadOps` and `VolumeWriteOps` metrics at p99 over the past 30 days.",
            "Calculate equivalent gp3 IOPS: if the current gp2 volume uses burst IOPS above 3,000, provision additional gp3 IOPS ($0.005/IOPS-month above 3,000).",
            "Run `aws ec2 modify-volume --volume-id vol-xxxx --volume-type gp3` — no downtime required.",
            "Verify the change in the EC2 console: volume state will show 'optimizing' then 'completed'.",
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Snapshot Lifecycle Management",
        },
        {
          type: "paragraph",
          text: "EBS snapshots are stored in S3 at $0.05/GB-month. Snapshots are incremental — the first snapshot copies the entire volume, subsequent snapshots store only changed blocks. However, the cost of each snapshot is based on the data it uniquely contains. Snapshots accumulate quickly in active environments and are a common source of hidden storage spend.",
        },
        {
          type: "callout",
          variant: "tip",
          title:
            "Use Amazon Data Lifecycle Manager for automated snapshot cleanup",
          text: "Amazon Data Lifecycle Manager (DLM) is free and automates snapshot creation and deletion on a schedule. Create a DLM policy: take daily snapshots, retain the last 7 daily + 4 weekly + 3 monthly snapshots, and delete the rest. Without automation, teams accumulate months or years of snapshots they never delete.",
        },
        {
          type: "heading",
          level: 3,
          text: "Identifying Unattached EBS Volumes",
        },
        {
          type: "paragraph",
          text: "Unattached EBS volumes are billed at full price whether or not an EC2 instance uses them. Volumes become detached when instances are terminated without deleting their volumes (a common mistake when EC2's 'Delete on Termination' setting is left disabled). A 1 TB gp3 unattached volume costs $80/month indefinitely.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Enable 'Delete on Termination' for non-persistent volumes",
          text: "By default, the root EBS volume has 'Delete on Termination' enabled, but additional data volumes do not. For instances where data volumes are ephemeral, enable 'Delete on Termination' at launch. For existing volumes, use AWS Config rule `ec2-volume-inuse-check` to flag unattached volumes and generate findings for review.",
        },
      ],
      flashcards: [
        {
          id: "m3-ebs-optimization-01",
          moduleId: "3",
          front:
            "What is the cost and baseline IOPS difference between gp2 and gp3 EBS volumes?",
          back: "gp3: $0.08/GB-month with 3,000 IOPS free for any volume size. gp2: $0.10/GB-month with 3 IOPS per GB (minimum 100 IOPS). gp3 is 20% cheaper AND provides 3,000 IOPS regardless of size, eliminating the need to over-provision storage to get IOPS.",
          tags: ["ebs", "gp2", "gp3", "pricing", "iops"],
        },
        {
          id: "m3-ebs-optimization-02",
          moduleId: "3",
          front: "How do you migrate a gp2 volume to gp3 without downtime?",
          back: "Use the EBS ModifyVolume API or AWS CLI: `aws ec2 modify-volume --volume-id vol-xxxx --volume-type gp3`. The volume remains fully operational during modification. State changes from 'in-use' to 'optimizing' (15–60 min) and then 'completed'.",
          tags: ["ebs", "gp3", "migration", "modify-volume"],
        },
        {
          id: "m3-ebs-optimization-03",
          moduleId: "3",
          front:
            "What is the EBS snapshot price and how does incremental snapshots affect cost?",
          back: "$0.05/GB-month. The first snapshot copies the full volume. Subsequent snapshots store only changed blocks. However, cost is based on unique data each snapshot contains — accumulated snapshots over months can cost as much as the original volume. Use Amazon Data Lifecycle Manager (free) to automate retention and deletion.",
          tags: ["ebs", "snapshots", "pricing", "dlm"],
        },
        {
          id: "m3-ebs-optimization-04",
          moduleId: "3",
          front:
            "Which AWS service automatically creates and deletes EBS snapshots on a schedule?",
          back: "Amazon Data Lifecycle Manager (DLM). It is free and allows you to define policies: e.g., daily snapshots, retain 7 daily + 4 weekly + 3 monthly, delete the rest. Prevents snapshot accumulation, which is a common source of silent EBS storage waste.",
          tags: ["ebs", "dlm", "snapshots", "automation"],
        },
        {
          id: "m3-ebs-optimization-05",
          moduleId: "3",
          front:
            "What happens to EBS volumes when an EC2 instance is terminated by default?",
          back: "The root volume has 'Delete on Termination' enabled by default, but additional data volumes do NOT — they become unattached and continue to incur charges at full price. Enable 'Delete on Termination' for ephemeral data volumes at launch, or use the AWS Config rule `ec2-volume-inuse-check` to detect unattached volumes.",
          tags: ["ebs", "unattached-volumes", "delete-on-termination", "cost"],
        },
      ],
    },
    {
      id: "rds-aurora",
      title: "RDS & Aurora Optimization",
      estimatedMinutes: 14,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "RDS Instance Sizing and Cost Drivers",
        },
        {
          type: "paragraph",
          text: "RDS costs break down into three main categories: **compute** (instance-hour charges, typically 60–70% of total), **storage** (provisioned GB-month plus I/O requests for io1/io2 volumes), and **data transfer** (inter-AZ replication, cross-region, and internet egress). Rightsizing the compute dimension has the highest impact.",
        },
        {
          type: "table",
          headers: [
            "RDS Component",
            "Pricing Example (db.m6g.xlarge, us-east-1)",
            "Notes",
          ],
          rows: [
            ["On-Demand compute", "$0.291/hr", "MySQL/PostgreSQL; ~$210/month"],
            ["1-yr No Upfront RI", "$0.175/hr", "~40% savings vs On-Demand"],
            ["3-yr All Upfront RI", "$0.091/hr", "~69% savings vs On-Demand"],
            [
              "gp3 storage",
              "$0.115/GB-month",
              "First 3,000 IOPS and 125 MB/s free",
            ],
            [
              "Multi-AZ surcharge",
              "~2x instance cost",
              "Adds synchronous standby replica",
            ],
            [
              "Read Replica",
              "Full instance cost",
              "Asynchronous; readable; promotable",
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Rightsize before buying RDS Reserved Instances",
          text: "A 3-year All Upfront RI on a db.m6g.xlarge saves ~69% ($210/month → $65/month). But if the instance should actually be a db.m6g.large (half the size), you are saving 69% of the wrong baseline. Always spend 2–4 weeks analyzing Performance Insights data and rightsizing before committing to an RI.",
        },
        {
          type: "heading",
          level: 3,
          text: "RDS Performance Insights for Rightsizing",
        },
        {
          type: "paragraph",
          text: "**RDS Performance Insights** visualizes database load as Average Active Sessions (AAS) broken down by SQL query, wait event, host, and user. A well-sized instance should have AAS consistently below the number of vCPUs. Performance Insights is free with 7-day retention for db.t3 and larger instances; 2-year retention costs $0.02/vCPU-hour.",
        },
        {
          type: "callout",
          variant: "info",
          title: "The AAS rule of thumb",
          text: "If Average Active Sessions consistently exceeds the number of vCPUs on your RDS instance, the database is compute-constrained and may need upsizing — or query optimization. If AAS is consistently below 0.5× vCPUs with no wait events, the instance is over-provisioned and a candidate for downsizing.",
        },
        {
          type: "heading",
          level: 3,
          text: "Multi-AZ vs Read Replicas: Cost Implications",
        },
        {
          type: "paragraph",
          text: "Multi-AZ adds a synchronous standby replica for automatic failover — the standby is not readable and approximately doubles the instance cost. Read Replicas are asynchronous, readable, and cost the same per-instance rate. If you need both high availability AND read scaling, you can have Multi-AZ enabled on a primary while running Read Replicas from that primary.",
        },
        {
          type: "bullet-list",
          items: [
            "Enable Multi-AZ only for production databases with RTO < 2 minutes — the standby failover completes in 60–120 seconds.",
            "For dev/test RDS instances, disable Multi-AZ and use automated snapshots for recovery — much cheaper.",
            "Use Read Replicas for read-heavy workloads like reporting, analytics, and read-scaled APIs.",
            "Cross-region Read Replicas cost cross-region data transfer fees in addition to the instance cost.",
            "Consider RDS Proxy to pool application connections and reduce the CPU overhead of connection management on the database instance.",
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Aurora Serverless v2: ACU Pricing",
        },
        {
          type: "paragraph",
          text: "Aurora Serverless v2 scales in 0.5 ACU increments between a configured minimum and maximum. Each ACU provides approximately 2 GB of RAM and proportional CPU. Pricing is $0.12 per ACU-hour in us-east-1 (MySQL/PostgreSQL compatible). You pay per second for the ACUs consumed.",
        },
        {
          type: "table",
          headers: [
            "Attribute",
            "Aurora Provisioned (db.r6g.large)",
            "Aurora Serverless v2",
          ],
          rows: [
            [
              "Compute billing",
              "$0.24/hr (fixed)",
              "$0.12/ACU-hr (2 ACU = $0.24/hr at peak)",
            ],
            [
              "Scale-to-zero",
              "No",
              "No (minimum 0.5 ACU = $0.06/hr always-on)",
            ],
            ["Scale speed", "Not automatic", "~seconds, 0.5 ACU granularity"],
            ["Multi-AZ", "Yes (separate cost)", "Yes (included in ACU charge)"],
            [
              "Best for",
              "Steady predictable load",
              "Variable, spiky, or new workloads",
            ],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Aurora Serverless v2 cannot pause to zero",
          text: "Unlike Aurora Serverless v1, v2 cannot pause when idle. At the minimum 0.5 ACU, it costs $0.06/hr = $43.80/month continuously. For databases used only a few hours per day (dev/test), Aurora Serverless v1 (which CAN pause to zero) or RDS with automated start/stop scheduling is significantly cheaper.",
        },
        {
          type: "heading",
          level: 3,
          text: "RDS Reserved Instances: Maximum Savings",
        },
        {
          type: "paragraph",
          text: "RDS Reserved Instances follow the same payment options as EC2: No Upfront (~40% savings), Partial Upfront (~45%), and All Upfront (~50–69% depending on term and family). RDS RIs are specific to the DB engine, instance class, multi-AZ, and region. They do not transfer between engines (e.g., a MySQL RI does not apply to PostgreSQL).",
        },
      ],
      flashcards: [
        {
          id: "m3-rds-aurora-01",
          moduleId: "3",
          front:
            "What is the approximate discount for a 3-year All Upfront RDS Reserved Instance?",
          back: "Approximately 69% savings vs On-Demand. For a db.m6g.xlarge in us-east-1 (MySQL): On-Demand $0.291/hr → 3-yr All Upfront $0.091/hr. Always rightsize the instance before purchasing RIs — an RI on the wrong size locks in the wrong cost.",
          tags: ["rds", "reserved-instances", "cost", "pricing"],
        },
        {
          id: "m3-rds-aurora-02",
          moduleId: "3",
          front:
            "What metric does RDS Performance Insights use to show database load, and what is the healthy threshold?",
          back: "Average Active Sessions (AAS). A healthy instance has AAS consistently below the vCPU count. If AAS frequently exceeds vCPU count, the database is compute-constrained. If AAS is below 0.5× vCPUs with minimal wait events, the instance is a rightsizing candidate.",
          tags: ["rds", "performance-insights", "rightsizing", "aas"],
        },
        {
          id: "m3-rds-aurora-03",
          moduleId: "3",
          front: "Why is a Multi-AZ RDS standby not suitable for read scaling?",
          back: "The Multi-AZ standby is synchronous and not readable — it exists solely for automatic failover with RTO of 60–120 seconds. For read scaling, use asynchronous Read Replicas, which serve read traffic and can be promoted to primary if needed.",
          tags: ["rds", "multi-az", "read-replicas", "ha"],
        },
        {
          id: "m3-rds-aurora-04",
          moduleId: "3",
          front:
            "What is the Aurora Serverless v2 ACU price in us-east-1 and what is the minimum monthly cost?",
          back: "$0.12 per ACU-hour. Minimum 0.5 ACU is always active = $0.06/hr = $43.80/month. Aurora Serverless v2 cannot pause to zero, making it more expensive than v1 for databases with very low daily usage.",
          tags: ["aurora", "serverless-v2", "acu", "pricing"],
        },
        {
          id: "m3-rds-aurora-05",
          moduleId: "3",
          front:
            "Are RDS Reserved Instances transferable between database engines?",
          back: "No. RDS RIs are specific to the DB engine (MySQL, PostgreSQL, etc.), instance class, multi-AZ, and region. A MySQL RI cannot be applied to PostgreSQL usage. When purchasing RDS RIs, verify you are buying for the correct engine.",
          tags: ["rds", "reserved-instances", "engines"],
        },
      ],
    },
    {
      id: "nosql-caching",
      title: "DynamoDB & ElastiCache Optimization",
      estimatedMinutes: 12,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "DynamoDB Capacity Modes and Cost Structure",
        },
        {
          type: "paragraph",
          text: "DynamoDB offers two capacity modes with dramatically different cost implications at scale. **On-Demand** mode charges per request unit consumed; **Provisioned** mode charges per capacity unit reserved per hour. The difference in cost between them for the same workload can be 3–6×.",
        },
        {
          type: "table",
          headers: [
            "Pricing Dimension",
            "On-Demand Rate (us-east-1)",
            "Provisioned Rate (us-east-1)",
            "Notes",
          ],
          rows: [
            [
              "Write",
              "$1.25 per million WRUs",
              "$0.00065 per WCU-hour",
              "On-Demand WRU = 1 write ≤1KB; Provisioned WCU = 1 write/second ≤1KB",
            ],
            [
              "Read (strong consistent)",
              "$0.25 per million RRUs",
              "$0.00013 per RCU-hour",
              "On-Demand RRU = 1 strong read ≤4KB",
            ],
            [
              "Read (eventual consistent)",
              "$0.125 per million RRUs",
              "$0.000065 per RCU-hour",
              "Half price for eventually consistent",
            ],
            [
              "Storage",
              "$0.25/GB-month",
              "$0.25/GB-month",
              "Same for both modes",
            ],
            [
              "Reserved Capacity (writes)",
              "N/A",
              "Up to 76% savings (3-yr)",
              "Prepay for WCU-hours",
            ],
          ],
        },
        {
          type: "callout",
          variant: "important",
          title: "On-Demand vs Provisioned at 1,000 writes/second",
          text: "On-Demand: 1,000 writes/sec × 86,400 sec/day × 30 days = 2.59B WRUs → $3,234/month. Provisioned: 1,000 WCUs × $0.00065/hr × 720 hrs = $468/month. Add 3-yr Reserved Capacity (76% discount) = $112/month. On-Demand is 29× more expensive at this scale. Switch to Provisioned once traffic patterns are stable.",
        },
        {
          type: "heading",
          level: 3,
          text: "DynamoDB Reserved Capacity",
        },
        {
          type: "paragraph",
          text: "DynamoDB Reserved Capacity is available only for Provisioned mode tables. You purchase a quantity of WCU-hours and RCU-hours at a discounted rate for a 1-year or 3-year term. Reserved Capacity discounts are up to 76% for write capacity and up to 76% for read capacity on a 3-year All Upfront term.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Reserved Capacity strategy: buy at the p75 baseline",
          text: "Buy Reserved Capacity to cover your steady-state 75th percentile throughput. Configure DynamoDB Auto Scaling to handle the remaining peaks up to your maximum. Reserved Capacity applies to all tables in the account/region automatically. You don't assign it to specific tables.",
        },
        {
          type: "heading",
          level: 3,
          text: "DynamoDB Accelerator (DAX): Cost-Benefit Analysis",
        },
        {
          type: "paragraph",
          text: "DAX is a fully managed DynamoDB-compatible cache that delivers microsecond read latency and reduces DynamoDB RCU consumption. DAX nodes are billed hourly regardless of hit rate: a dax.r6g.large costs $0.228/hr (~$164/month). A DAX cluster with a single primary costs at least $164/month before the cache delivers any savings.",
        },
        {
          type: "table",
          headers: [
            "DAX Node",
            "$/hr",
            "Memory",
            "Break-even RCU savings/month needed",
          ],
          rows: [
            ["dax.r6g.large", "$0.228/hr", "13 GB", "~$164 in RCU savings"],
            ["dax.r6g.xlarge", "$0.456/hr", "26 GB", "~$328 in RCU savings"],
            ["dax.r6g.2xlarge", "$0.912/hr", "52 GB", "~$657 in RCU savings"],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "DAX is not cost-effective for all workloads",
          text: "DAX breaks even only when DynamoDB RCU savings exceed the DAX node cost. Calculate: monthly RCU savings = (total RCUs × cache hit rate × $0.00013/RCU-hr × 720 hrs). If this is less than the DAX node cost, you are paying more for caching than you save. A low cache hit rate (common for write-heavy or highly random read patterns) makes DAX expensive.",
        },
        {
          type: "heading",
          level: 3,
          text: "ElastiCache: Node Sizing and Reserved Nodes",
        },
        {
          type: "paragraph",
          text: "ElastiCache charges by node-hour. For Redis, the dominant cost drivers are: node size (memory-to-cost ratio), number of replicas (Multi-AZ), and whether Cluster Mode is enabled. Graviton-based nodes (r7g, m7g) provide better memory bandwidth and are 8–20% cheaper than equivalent x86 nodes.",
        },
        {
          type: "bullet-list",
          items: [
            "Monitor `DatabaseMemoryUsagePercentage` — keep peak below 75% to leave headroom for replication and failover buffers.",
            "Monitor `EngineCPUUtilization` (Redis is single-threaded per shard) — if consistently above 50%, add shards (Cluster Mode) rather than upgrading node memory.",
            "Disable Multi-AZ for dev/test ElastiCache clusters — a single-node cluster is sufficient for caching non-critical data.",
            "ElastiCache Reserved Nodes provide 40% savings (1-year) to 55% savings (3-year) vs On-Demand node pricing.",
            "Graviton3 ElastiCache nodes (r7g family) offer better price/performance for Redis — check ElastiCache version compatibility before upgrading.",
          ],
        },
      ],
      flashcards: [
        {
          id: "m3-nosql-caching-01",
          moduleId: "3",
          front:
            "At 1,000 writes/second, what is the approximate monthly cost of DynamoDB On-Demand vs Provisioned with 3-year Reserved Capacity?",
          back: "On-Demand: ~$3,234/month (2.59B WRUs × $1.25/million). Provisioned without RI: ~$468/month. Provisioned with 3-yr Reserved Capacity (76% discount): ~$112/month. On-Demand is roughly 29× more expensive at high stable throughput.",
          tags: [
            "dynamodb",
            "on-demand",
            "provisioned",
            "reserved-capacity",
            "pricing",
          ],
        },
        {
          id: "m3-nosql-caching-02",
          moduleId: "3",
          front:
            "How does DynamoDB Reserved Capacity work and which tables does it apply to?",
          back: "You purchase WCU-hours and RCU-hours at a discounted rate (up to 76% off for 3-year All Upfront) for Provisioned mode tables. Reserved Capacity applies automatically to all eligible Provisioned tables in the same account and region — you don't need to assign it to specific tables.",
          tags: ["dynamodb", "reserved-capacity", "provisioned"],
        },
        {
          id: "m3-nosql-caching-03",
          moduleId: "3",
          front:
            "What is the minimum monthly cost of a single-node DAX cluster using dax.r6g.large, and how do you determine if it is cost-effective?",
          back: "dax.r6g.large: $0.228/hr × 720 hrs = ~$164/month. It is cost-effective only if DynamoDB RCU savings exceed $164/month. Calculate: saved RCUs × cache hit rate × $0.00013/RCU-hr × 720 hrs. Low hit rate or write-heavy tables rarely justify DAX.",
          tags: ["dynamodb", "dax", "cost", "break-even"],
        },
        {
          id: "m3-nosql-caching-04",
          moduleId: "3",
          front:
            "What CloudWatch metric indicates CPU saturation on a Redis ElastiCache node, and what should you do if it's high?",
          back: "`EngineCPUUtilization` — Redis is single-threaded per shard. If consistently above 50%, adding more memory to a single node won't help. Enable Cluster Mode and add shards to distribute CPU load horizontally. Also check `CurrConnections` for connection pooling issues.",
          tags: ["elasticache", "redis", "cloudwatch", "rightsizing"],
        },
        {
          id: "m3-nosql-caching-05",
          moduleId: "3",
          front:
            "What discount do ElastiCache Reserved Nodes provide and how do they compare to DynamoDB Reserved Capacity?",
          back: "ElastiCache Reserved Nodes: ~40% savings (1-year), ~55% (3-year) vs On-Demand. DynamoDB Reserved Capacity: up to 76% (3-year All Upfront for write capacity). Both apply within the same account and region automatically. ElastiCache reserved nodes are slightly less generous than DynamoDB's.",
          tags: [
            "elasticache",
            "reserved-nodes",
            "dynamodb",
            "reserved-capacity",
            "cost",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m3-q1",
      text: "A team has an m5.2xlarge EC2 instance (On-Demand: $0.384/hr) running a web server that averages 8% CPU but hits 72% CPU at p99. Compute Optimizer recommends downsizing to m5.xlarge. What is the correct next step before acting on this recommendation?",
      options: [
        "Immediately modify the instance type to m5.xlarge and monitor for alerts",
        "Verify p99 memory and network utilization over 14+ days using CloudWatch Agent metrics before downsizing",
        "Purchase an m5.xlarge Reserved Instance first, then resize the instance",
        "Enable Enhanced Infrastructure Metrics and wait 3 months before any action",
      ],
      correctIndex: 1,
      explanation:
        "Compute Optimizer without CloudWatch Agent data only sees CPU metrics, not memory, disk, or network — it will mark the recommendation as 'Insufficient data' for memory. A web server might be CPU-light but memory-heavy (e.g., large JVM heap). Before resizing, install the CloudWatch Agent to collect memory metrics, observe 14+ days of p99 values across CPU, memory, and network, then validate in staging. Purchasing an RI before rightsizing locks you into the wrong instance size.",
    },
    {
      id: "m3-q2",
      text: "A Lambda function allocated 256 MB runs for 500ms (x86) at 1M invocations/month. If you switch to 1024 MB ARM and it now runs in 100ms, what is the approximate change in monthly duration cost?",
      options: [
        "Cost increases by ~60% because memory increased 4x",
        "Cost decreases by ~79% because the GB-second product and ARM rate are both lower",
        "Cost stays approximately the same because GB-seconds are conserved",
        "Cost decreases by exactly 20% because ARM is 20% cheaper than x86",
      ],
      correctIndex: 1,
      explanation:
        "x86 at 256 MB / 500ms: 0.25 GB × 0.5 s × 1M = 125,000 GB-sec × $0.0000166667 = $2.08/month. ARM at 1024 MB / 100ms: 1.0 GB × 0.1 s × 1M = 100,000 GB-sec × $0.0000133334 = $1.33/month. Reduction: ($2.08 - $1.33) / $2.08 = ~36%. The 20% ARM discount plus the 4x duration reduction (offset by 4x memory) produces a combined ~36% cost reduction, not 20% or 79%. Always use Lambda Power Tuning to find the actual optimal memory.",
    },
    {
      id: "m3-q3",
      text: "Your company has 200 m5.xlarge EC2 instances running 24/7 in us-east-1. You know they will be needed for at least 3 more years. On-Demand costs $0.192/hr each. Which purchase strategy minimizes cost?",
      options: [
        "Compute Savings Plan (1-year, no upfront) at estimated 38% savings",
        "Standard Reserved Instances (3-year, All Upfront) at approximately 60% savings",
        "Spot Instances with Auto Scaling to handle interruptions",
        "EC2 Instance Savings Plan (1-year) with a Convertible RI for flexibility",
      ],
      correctIndex: 1,
      explanation:
        "For 200 instances running 24/7 for 3+ years with a known, stable fleet, 3-year All Upfront Standard Reserved Instances offer the maximum discount (~60%) and the lowest total cost. Spot Instances are not suitable for 24/7 production workloads that cannot tolerate interruption. Compute Savings Plans are more flexible but offer lower discounts (~38–66%). If instance type flexibility is needed, Convertible RIs at 3-year terms save ~54%. The Standard 3-yr RI is optimal for this scenario.",
    },
    {
      id: "m3-q4",
      text: "A team wants to migrate a 2 TB S3 Standard bucket containing application logs that are 30–365 days old (rarely accessed) and records older than 365 days (never accessed, required for 7-year compliance). What is the most cost-effective storage strategy?",
      options: [
        "Enable S3 Intelligent-Tiering on the entire bucket",
        "Lifecycle rule: Standard-IA at 30 days, Glacier Flexible Retrieval at 90 days, Deep Archive at 365 days",
        "Move everything older than 30 days to Glacier Deep Archive immediately",
        "Enable S3 Requester Pays to shift retrieval costs to the requester",
      ],
      correctIndex: 1,
      explanation:
        "The optimal strategy matches storage class to access pattern. Logs 30–365 days old are rarely accessed → Standard-IA ($0.0125/GB) after 30 days. Logs 90+ days old are almost never accessed → Glacier Flexible ($0.0036/GB) at 90 days. Records after 365 days are compliance-only with 12–48 hour retrieval acceptable → Deep Archive ($0.00099/GB). Intelligent-Tiering (option A) would charge monitoring fees for millions of log objects. Moving everything to Deep Archive at 30 days violates Standard-IA's 30-day minimum and ignores that occasional access in the 30–90 day window incurs high Glacier retrieval fees.",
    },
    {
      id: "m3-q5",
      text: "A DynamoDB table receives 500 writes/second and 5,000 reads/second consistently throughout the day. The team is on On-Demand mode. Which configuration provides the maximum savings?",
      options: [
        "Switch to Provisioned mode with Auto Scaling enabled (no Reserved Capacity)",
        "Keep On-Demand mode but add DAX to reduce read capacity units consumed",
        "Switch to Provisioned mode and purchase 3-year All Upfront Reserved Capacity for writes and reads",
        "Enable DynamoDB Streams and process writes in Lambda to reduce table writes",
      ],
      correctIndex: 2,
      explanation:
        "At 500 writes/second and 5,000 reads/second consistently throughout the day, traffic is extremely predictable — the ideal scenario for Provisioned mode plus Reserved Capacity. Provisioned mode alone saves ~6× vs On-Demand for writes. Adding 3-year All Upfront Reserved Capacity saves up to 76% on top of that. Adding DAX (option B) introduces a minimum $164/month node cost and requires code changes, while the RCU savings may not exceed DAX node cost unless the cache hit rate is very high. Auto Scaling alone (option A) avoids over-provisioning but misses the ~76% Reserved Capacity discount.",
    },
  ],
};
