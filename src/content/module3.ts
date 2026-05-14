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
      id: "ec2-rightsizing",
      title: "EC2 Rightsizing",
      estimatedMinutes: 12,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "EC2 Instance Families and Rightsizing",
        },
        {
          type: "paragraph",
          text: "EC2 offers over 400 instance types organized into families optimized for different workloads. Selecting the wrong family — or the wrong size within a family — is one of the most common sources of wasted AWS spend. Rightsizing means matching instance size and family to actual workload requirements.",
        },
        {
          type: "table",
          headers: ["Family", "Optimized For", "Examples", "Use Case"],
          rows: [
            [
              "General Purpose",
              "Balanced CPU/memory",
              "t3, m6i, m7g",
              "Web servers, small databases",
            ],
            [
              "Compute Optimized",
              "High CPU",
              "c6i, c7g",
              "Batch jobs, video encoding, gaming",
            ],
            [
              "Memory Optimized",
              "High memory",
              "r6i, x2idn",
              "In-memory DBs, real-time analytics",
            ],
            [
              "Storage Optimized",
              "High I/O throughput",
              "i4i, d3",
              "NoSQL, data warehouses",
            ],
            ["Accelerated", "GPU/FPGA", "p4d, g5", "ML training, HPC"],
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "AWS Compute Optimizer",
        },
        {
          type: "paragraph",
          text: "**AWS Compute Optimizer** analyzes 14 days of CloudWatch metrics and applies ML to recommend optimal instance types. It covers EC2 instances, Auto Scaling groups, EBS volumes, Lambda functions, and ECS on Fargate. Recommendations include a risk classification (over-provisioned, under-provisioned, optimized) and projected cost impact.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Enable Compute Optimizer org-wide",
          text: "Opt in Compute Optimizer at the AWS Organizations management account level so all member accounts are automatically included. Enhanced recommendations (which use CloudWatch agent metrics like memory utilization) require opting into enhanced infrastructure metrics at an additional cost of ~$0.0033 per resource per hour.",
        },
        {
          type: "heading",
          level: 3,
          text: "Rightsizing Process",
        },
        {
          type: "numbered-list",
          items: [
            "Collect baseline: enable CloudWatch detailed monitoring; install CloudWatch agent to capture memory and disk metrics.",
            "Identify candidates: use Compute Optimizer or Cost Explorer's rightsizing recommendations filtered to over-provisioned instances.",
            "Validate: review P99 CPU, memory, network I/O, and disk I/O over a representative 2–4 week period.",
            "Test: launch a same-workload instance at the smaller size in a staging environment.",
            "Deploy: use Auto Scaling group refresh or blue/green deployment to minimize risk.",
            "Repeat quarterly: workloads change and new instance generations offer better price/performance.",
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Burstable Instances (T-Series)",
        },
        {
          type: "paragraph",
          text: "T3 and T4g instances use a **CPU credit model**. Each instance earns credits while CPU utilization is below its baseline and spends them when it bursts above baseline. In `unlimited` mode (default for T3/T4g), the instance can burst indefinitely but you are charged for surplus credits at a fixed rate (~$0.05 per vCPU-hour for T3).",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Watch for surplus CPU credit charges",
          text: "Workloads that sustain CPU above baseline for extended periods on T-series instances in unlimited mode can cost more than an equivalent M or C instance. Monitor the `CPUSurplusCreditBalance` and `CPUSurplusCreditsCharged` CloudWatch metrics. If surplus charges appear regularly, switch to a fixed-performance instance family.",
        },
      ],
      flashcards: [
        {
          id: "m3-ec2-rightsizing-01",
          moduleId: "3",
          front:
            "What does AWS Compute Optimizer use to generate EC2 rightsizing recommendations?",
          back: "14 days of CloudWatch metrics analyzed with machine learning. Enhanced recommendations also use CloudWatch agent metrics (memory, disk) when enhanced infrastructure metrics is enabled.",
          tags: ["ec2", "compute-optimizer", "rightsizing"],
        },
        {
          id: "m3-ec2-rightsizing-02",
          moduleId: "3",
          front:
            "When do T3/T4g instances in `unlimited` mode generate extra charges?",
          back: "When CPU utilization sustains above the instance's baseline for long enough to exhaust earned CPU credits, the instance spends surplus credits charged at ~$0.05 per vCPU-hour (T3). Monitor CPUSurplusCreditsCharged to detect this.",
          tags: ["ec2", "t-series", "burstable", "cost"],
        },
        {
          id: "m3-ec2-rightsizing-03",
          moduleId: "3",
          front:
            "Which EC2 instance family is best for memory-intensive workloads like in-memory databases?",
          back: "Memory Optimized family (r6i, r7g, x2idn). These have high memory-to-vCPU ratios suited for Redis, SAP HANA, real-time analytics, and large in-memory caches.",
          tags: ["ec2", "instance-families", "memory-optimized"],
        },
        {
          id: "m3-ec2-rightsizing-04",
          moduleId: "3",
          front: "What is the recommended cadence for EC2 rightsizing reviews?",
          back: "Quarterly. Workload patterns change over time, and AWS regularly releases new instance generations with better price/performance ratios (e.g., Graviton-based M7g vs. M6i).",
          tags: ["ec2", "rightsizing", "best-practices"],
        },
      ],
    },
    {
      id: "lambda-cost",
      title: "Lambda Cost Optimization",
      estimatedMinutes: 8,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Lambda Pricing Model",
        },
        {
          type: "paragraph",
          text: "Lambda charges on two dimensions: **number of requests** ($0.20 per 1M requests after the free tier) and **duration** (GB-seconds of memory allocated × execution time, billed in 1ms increments). The free tier grants 1M requests and 400,000 GB-seconds per month.",
        },
        {
          type: "table",
          headers: ["Dimension", "Rate (us-east-1)", "Notes"],
          rows: [
            ["Requests", "$0.20 / 1M", "Free tier: 1M req/month"],
            [
              "Duration (x86)",
              "$0.0000166667 / GB-sec",
              "Billed in 1ms increments",
            ],
            [
              "Duration (ARM)",
              "$0.0000133334 / GB-sec",
              "~20% cheaper than x86",
            ],
            [
              "Provisioned concurrency",
              "$0.0000041667 / GB-sec",
              "Charged even when idle",
            ],
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Memory Tuning with Lambda Power Tuning",
        },
        {
          type: "paragraph",
          text: "Memory allocation in Lambda also controls the proportion of vCPU allocated. Increasing memory can reduce duration enough that the total GB-seconds — and therefore cost — decreases. **AWS Lambda Power Tuning** is an open-source Step Functions state machine that runs your function at multiple memory settings and reports the optimal memory for cost, performance, or a balanced trade-off.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Run Power Tuning before setting production memory",
          text: "Deploy the Lambda Power Tuning SAR application from the Serverless Application Repository and invoke it with your function ARN. A common finding is that CPU-bound functions run faster (and cheaper) at 1024 MB than at 128 MB because the additional vCPU reduces duration by more than the memory cost increase.",
        },
        {
          type: "heading",
          level: 3,
          text: "Provisioned Concurrency Trade-offs",
        },
        {
          type: "paragraph",
          text: "Provisioned Concurrency eliminates cold starts by keeping execution environments initialized. However, you pay for allocated GB-seconds even when no requests are flowing. It is cost-effective only for latency-sensitive, consistently high-traffic functions. For sporadic or bursty workloads, on-demand Lambda with SnapStart (Java) or a smaller runtime is often cheaper.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Use Application Auto Scaling for Provisioned Concurrency",
          text: "Schedule Provisioned Concurrency to scale up before known traffic peaks and scale down during off-hours. This avoids paying for idle warm environments overnight or on weekends.",
        },
        {
          type: "heading",
          level: 3,
          text: "ARM/Graviton2 Lambda",
        },
        {
          type: "paragraph",
          text: "Switching Lambda from `x86_64` to `arm64` (Graviton2) reduces duration pricing by approximately **20%** with no changes to memory allocation, timeout, or IAM configuration. Most runtimes (Node.js, Python, Java, Go, Ruby, .NET) support arm64. The only requirement is that any native binaries or compiled layers must be rebuilt for ARM.",
        },
      ],
      flashcards: [
        {
          id: "m3-lambda-cost-01",
          moduleId: "3",
          front: "What two dimensions does AWS Lambda charge on?",
          back: "1) Number of requests ($0.20 per 1M after free tier). 2) Duration in GB-seconds (memory allocated × execution time in seconds, billed per 1ms).",
          tags: ["lambda", "pricing"],
        },
        {
          id: "m3-lambda-cost-02",
          moduleId: "3",
          front:
            "How much cheaper is Lambda ARM (Graviton2) duration pricing compared to x86?",
          back: "Approximately 20% cheaper. ARM duration rate is $0.0000133334/GB-sec vs $0.0000166667/GB-sec for x86 in us-east-1.",
          tags: ["lambda", "graviton", "arm", "cost"],
        },
        {
          id: "m3-lambda-cost-03",
          moduleId: "3",
          front: "What is Lambda Power Tuning and what problem does it solve?",
          back: "An open-source AWS Step Functions state machine that runs a Lambda function at multiple memory configurations and returns the optimal setting for cost, performance, or a balance. It solves the problem of guessing the memory setting that minimizes GB-second cost.",
          tags: ["lambda", "power-tuning", "optimization"],
        },
        {
          id: "m3-lambda-cost-04",
          moduleId: "3",
          front: "When is Provisioned Concurrency cost-effective for Lambda?",
          back: "When the function has consistent, high-volume traffic where cold-start latency is unacceptable and the per-GB-second cost of idle warm environments is less than the business cost of cold starts. Not cost-effective for sporadic or bursty traffic.",
          tags: ["lambda", "provisioned-concurrency", "cost"],
        },
      ],
    },
    {
      id: "storage-s3",
      title: "S3 & Storage Optimization",
      estimatedMinutes: 12,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "S3 Storage Classes",
        },
        {
          type: "paragraph",
          text: "Amazon S3 offers multiple storage classes with different cost profiles for storage, retrieval, and minimum storage duration. Matching data access patterns to the right class is the primary lever for S3 cost reduction.",
        },
        {
          type: "table",
          headers: [
            "Storage Class",
            "Min Duration",
            "Retrieval Fee",
            "Best For",
          ],
          rows: [
            ["S3 Standard", "None", "None", "Frequently accessed data"],
            [
              "S3 Standard-IA",
              "30 days",
              "Per-GB",
              "Infrequent access, ms retrieval",
            ],
            [
              "S3 One Zone-IA",
              "30 days",
              "Per-GB",
              "Reproducible infrequent data",
            ],
            [
              "S3 Intelligent-Tiering",
              "None*",
              "None (monitoring fee)",
              "Unknown or changing access patterns",
            ],
            [
              "S3 Glacier Instant Retrieval",
              "90 days",
              "Per-GB",
              "Archives, ms retrieval",
            ],
            [
              "S3 Glacier Flexible Retrieval",
              "90 days",
              "Per-GB (minutes–hours)",
              "Backups, disaster recovery",
            ],
            [
              "S3 Glacier Deep Archive",
              "180 days",
              "Per-GB (hours)",
              "Compliance, long-term retention",
            ],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Intelligent-Tiering minimum object size",
          text: "Objects smaller than 128 KB are not monitored or transitioned by Intelligent-Tiering — they are stored at Standard pricing. For buckets with many small objects, the monitoring fee ($0.0025 per 1,000 objects) can exceed the storage savings. Evaluate the object size distribution before enabling it.",
        },
        {
          type: "heading",
          level: 3,
          text: "S3 Lifecycle Policies",
        },
        {
          type: "paragraph",
          text: "Lifecycle rules automate object transitions and expirations. A common pattern: transition to Standard-IA after 30 days, to Glacier Flexible Retrieval after 90 days, and expire (delete) after 365 days. Rules can target a bucket prefix or object tags, enabling fine-grained control.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Enable S3 Storage Lens for visibility",
          text: "S3 Storage Lens provides organization-wide metrics including the percentage of storage in each class, incomplete multipart uploads, and non-current version storage. Use it to identify buckets accumulating Standard-priced objects that should be tiered down.",
        },
        {
          type: "heading",
          level: 3,
          text: "EBS Volume Types",
        },
        {
          type: "paragraph",
          text: "**gp3** is the current-generation general-purpose SSD and should be the default choice for most workloads. It decouples IOPS and throughput from storage size, making it approximately 20% cheaper than gp2 for equivalent performance while allowing you to provision only the IOPS you need.",
        },
        {
          type: "table",
          headers: ["Type", "Use Case", "Baseline IOPS", "Cost vs gp2"],
          rows: [
            [
              "gp3",
              "General purpose (default)",
              "3,000 (free)",
              "~20% cheaper",
            ],
            ["gp2", "Legacy general purpose", "3 IOPS/GB", "Baseline"],
            [
              "io2 Block Express",
              "Critical databases, sub-ms latency",
              "Up to 256,000",
              "Highest",
            ],
            [
              "st1",
              "Sequential big-data, log processing",
              "500 MB/s throughput",
              "Lower than gp",
            ],
            ["sc1", "Cold infrequent access", "250 MB/s throughput", "Lowest"],
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "EFS Cost Tips",
        },
        {
          type: "bullet-list",
          items: [
            "Use EFS Intelligent-Tiering to automatically move files not accessed for 30 days to the Infrequent Access storage class (approximately 92% cheaper than Standard).",
            "Avoid EFS for workloads that only need block storage — EFS is significantly more expensive than EBS per GB.",
            "Use EFS One Zone storage class for non-critical, single-AZ workloads to save about 47% vs Multi-AZ Standard.",
            "Monitor `PercentIOLimit` metric; if it consistently exceeds 80%, consider Provisioned Throughput mode.",
          ],
        },
      ],
      flashcards: [
        {
          id: "m3-storage-s3-01",
          moduleId: "3",
          front:
            "Which S3 storage class has no retrieval fee and automatically moves objects between access tiers?",
          back: "S3 Intelligent-Tiering. It charges a small per-object monitoring fee ($0.0025 per 1,000 objects) but no retrieval fees, and automatically moves objects between Frequent Access, Infrequent Access, and Archive tiers based on access patterns.",
          tags: ["s3", "storage-classes", "intelligent-tiering"],
        },
        {
          id: "m3-storage-s3-02",
          moduleId: "3",
          front: "Why should most new EBS volumes use gp3 instead of gp2?",
          back: "gp3 is approximately 20% cheaper than gp2 and decouples IOPS and throughput provisioning from storage capacity. With gp2, IOPS scale at 3 IOPS/GB, forcing you to over-provision storage to get more IOPS. gp3 provides 3,000 IOPS free regardless of size.",
          tags: ["ebs", "gp3", "gp2", "storage", "cost"],
        },
        {
          id: "m3-storage-s3-03",
          moduleId: "3",
          front:
            "What is the minimum storage duration for S3 Glacier Deep Archive and why does it matter for cost?",
          back: "180 days. If you delete an object before 180 days, you are charged for the remaining minimum duration. This makes it unsuitable for data with unpredictable deletion patterns.",
          tags: ["s3", "glacier", "deep-archive", "minimum-duration"],
        },
        {
          id: "m3-storage-s3-04",
          moduleId: "3",
          front: "How does EFS Intelligent-Tiering reduce costs?",
          back: "It automatically moves files not accessed in 30 days to the Infrequent Access storage class, which costs approximately 92% less per GB than EFS Standard. Files are moved back to Standard on the next access.",
          tags: ["efs", "intelligent-tiering", "cost"],
        },
      ],
    },
    {
      id: "rds-aurora",
      title: "RDS & Aurora Optimization",
      estimatedMinutes: 12,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "RDS Instance Sizing",
        },
        {
          type: "paragraph",
          text: "RDS instance costs are dominated by compute (instance hours) and storage (GB-month). Database workloads are often under-observed — teams monitor application metrics but not DB-level CPU, memory, connections, and I/O. Use Performance Insights (free for db.t3 and larger, 7-day retention) to identify query bottlenecks before upsizing.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Rightsize before buying Reserved Instances",
          text: "Never purchase RDS Reserved Instances on an under-analyzed instance. Rightsize first using Performance Insights and Enhanced Monitoring, confirm the correct family and size over 2–4 weeks, then buy Reserved Instances. A 1-year No Upfront RI saves about 40% vs On-Demand; 3-year All Upfront saves about 60%.",
        },
        {
          type: "heading",
          level: 3,
          text: "Multi-AZ Trade-offs",
        },
        {
          type: "paragraph",
          text: "Multi-AZ deployments synchronously replicate data to a standby instance in a different Availability Zone for automatic failover. The standby is not readable and roughly doubles the instance cost. Multi-AZ Multi-Standby (three instances) adds a second readable standby for further resilience at even higher cost.",
        },
        {
          type: "bullet-list",
          items: [
            "Enable Multi-AZ only for production workloads with RTO requirements that justify the cost.",
            "For read scaling, use Read Replicas (asynchronous) instead of Multi-AZ — they serve read traffic and cost the same per-instance rate.",
            "Dev/test environments should use Single-AZ and automated stop schedules to avoid overnight charges.",
            "Consider RDS Proxy to pool connections and reduce the instance size needed to handle connection storms.",
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Aurora Serverless v2",
        },
        {
          type: "paragraph",
          text: "Aurora Serverless v2 scales capacity in increments of 0.5 ACU (Aurora Capacity Units) between a configured minimum and maximum. Each ACU provides approximately 2 GB of memory and proportional CPU. You pay only for the ACUs consumed, billed per second.",
        },
        {
          type: "table",
          headers: ["Attribute", "Aurora Provisioned", "Aurora Serverless v2"],
          rows: [
            ["Billing unit", "Instance-hour", "ACU-hour (per second)"],
            ["Scaling", "Manual or scheduled", "Automatic, ~seconds"],
            ["Min capacity", "Full instance cost", "0.5 ACU (~$0.06/hr)"],
            ["Multi-AZ", "Yes", "Yes"],
            [
              "Use case",
              "Stable, predictable load",
              "Variable or unknown load",
            ],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Aurora Serverless v2 minimum ACU cost",
          text: "Even at minimum capacity (0.5 ACU), Aurora Serverless v2 runs continuously. For databases used only a few hours per day, Aurora Serverless v1 (which can pause to zero) or RDS with automated start/stop may be cheaper. Serverless v2 cannot pause to zero.",
        },
        {
          type: "heading",
          level: 3,
          text: "RDS Storage Auto-Scaling",
        },
        {
          type: "paragraph",
          text: "RDS Storage Auto Scaling automatically increases storage when free space drops below a threshold, up to a configured maximum. There is no charge for the feature itself — you only pay for the provisioned storage. Storage can only grow; it cannot shrink automatically. Overly generous maximum settings lead to permanently provisioned storage you may not need.",
        },
      ],
      flashcards: [
        {
          id: "m3-rds-aurora-01",
          moduleId: "3",
          front:
            "What is the typical discount for a 1-year No Upfront RDS Reserved Instance versus On-Demand?",
          back: "Approximately 40% savings. A 3-year All Upfront commitment saves about 60% vs On-Demand. Always rightsize the instance before committing to an RI.",
          tags: ["rds", "reserved-instances", "cost"],
        },
        {
          id: "m3-rds-aurora-02",
          moduleId: "3",
          front:
            "What is the key difference between Aurora Serverless v1 and v2 regarding cost for low-utilization databases?",
          back: "Aurora Serverless v1 can pause to zero capacity (no ACU charges while paused), making it cheaper for databases used only a few hours per day. Serverless v2 cannot pause to zero — it always consumes at least the minimum ACU setting.",
          tags: ["aurora", "serverless", "cost"],
        },
        {
          id: "m3-rds-aurora-03",
          moduleId: "3",
          front: "Why shouldn't you use RDS Multi-AZ for read scaling?",
          back: "The Multi-AZ standby is not readable — it exists solely for failover. For read scaling, use Read Replicas, which serve read traffic and can be promoted. Multi-AZ and Read Replicas can be combined when both HA and read scaling are needed.",
          tags: ["rds", "multi-az", "read-replicas"],
        },
        {
          id: "m3-rds-aurora-04",
          moduleId: "3",
          front:
            "What tool should you use to identify query-level bottlenecks in RDS before upsizing an instance?",
          back: "RDS Performance Insights. It provides a database load graph broken down by SQL query, wait event, host, and user. Available for free with 7-day retention on most instance types.",
          tags: ["rds", "performance-insights", "rightsizing"],
        },
      ],
    },
    {
      id: "dynamodb-elasticache",
      title: "DynamoDB & ElastiCache",
      estimatedMinutes: 10,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "DynamoDB Capacity Modes",
        },
        {
          type: "paragraph",
          text: "DynamoDB offers two capacity modes: **On-Demand** and **Provisioned**. The right choice depends on traffic predictability and scale.",
        },
        {
          type: "table",
          headers: ["Attribute", "On-Demand Mode", "Provisioned Mode"],
          rows: [
            ["Billing unit", "Request Unit (RRU/WRU)", "RCU/WCU per hour"],
            [
              "Traffic pattern",
              "Unpredictable / spiky",
              "Predictable / steady",
            ],
            [
              "Cost at high scale",
              "Higher per-request",
              "Lower with reserved capacity",
            ],
            [
              "Auto Scaling",
              "Automatic",
              "Manual or via Application Auto Scaling",
            ],
            ["Reserved Capacity", "Not available", "Available (1yr/3yr)"],
          ],
        },
        {
          type: "paragraph",
          text: "At moderate-to-high throughput, **Provisioned mode with Auto Scaling** is significantly cheaper than On-Demand. The on-demand write request unit price is roughly 6× more expensive than a provisioned WCU when the table is consistently utilized.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Switch mode when traffic stabilizes",
          text: "Start new tables in On-Demand mode to avoid under- or over-provisioning. Once you observe 2–4 weeks of stable traffic patterns, switch to Provisioned with Auto Scaling and purchase Reserved Capacity for 1 or 3 years to reduce costs by up to 76%.",
        },
        {
          type: "heading",
          level: 3,
          text: "DynamoDB Accelerator (DAX)",
        },
        {
          type: "paragraph",
          text: "**DAX** is a fully managed in-memory cache for DynamoDB that delivers microsecond read latency. By caching read results, DAX reduces Read Capacity Units consumed from DynamoDB. DAX is cost-effective when a table has high read volume with a high cache hit ratio. However, DAX nodes are billed by the hour regardless of utilization — a DAX cluster with low read traffic can cost more than the RCU savings.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "DAX requires application-level changes",
          text: "DAX uses its own SDK client (dax-client). Migrating requires code changes and careful handling of eventually consistent reads. For simple caching without code changes, consider application-level caching with ElastiCache.",
        },
        {
          type: "heading",
          level: 3,
          text: "ElastiCache Node Sizing",
        },
        {
          type: "paragraph",
          text: "ElastiCache (Redis and Memcached) charges by node-hour. Common cost issues include: over-provisioned memory (choosing r6g.2xlarge when r6g.large suffices), running clusters 24/7 for dev/test environments, and not using cluster mode (Redis) which limits horizontal scaling.",
        },
        {
          type: "bullet-list",
          items: [
            "Use `EngineCPUUtilization` and `DatabaseMemoryUsagePercentage` CloudWatch metrics to rightsize nodes.",
            "Enable Graviton-based nodes (r7g, m7g) — they offer better price/performance than x86 equivalents.",
            "For dev/test Redis clusters, use a single-node cluster with no replicas and schedule automated snapshots instead of Multi-AZ.",
            "ElastiCache Reserved Nodes save about 40% (1-year) to 55% (3-year) vs On-Demand pricing.",
            "Use Redis Cluster Mode for workloads that can shard data — it distributes memory and CPU across multiple nodes, reducing the need for a single large node.",
          ],
        },
      ],
      flashcards: [
        {
          id: "m3-dynamodb-elasticache-01",
          moduleId: "3",
          front:
            "At what point should a DynamoDB table switch from On-Demand to Provisioned mode?",
          back: "When traffic patterns are predictable and consistent over 2–4 weeks. At sustained high throughput, provisioned WCUs are roughly 6× cheaper per request than On-Demand write request units. Combine with Reserved Capacity for up to 76% savings.",
          tags: ["dynamodb", "capacity-modes", "cost"],
        },
        {
          id: "m3-dynamodb-elasticache-02",
          moduleId: "3",
          front: "What is DAX and when is it not cost-effective?",
          back: "DAX is a fully managed DynamoDB in-memory cache. It is not cost-effective when the table has low read volume or a low cache hit ratio, because DAX nodes are billed hourly regardless of utilization — the node cost can exceed the RCU savings.",
          tags: ["dynamodb", "dax", "caching", "cost"],
        },
        {
          id: "m3-dynamodb-elasticache-03",
          moduleId: "3",
          front:
            "Which two CloudWatch metrics help rightsize ElastiCache Redis nodes?",
          back: "`EngineCPUUtilization` (CPU pressure on the Redis engine thread) and `DatabaseMemoryUsagePercentage` (percentage of memory in use). Both should be well below their maximums before downsizing.",
          tags: ["elasticache", "redis", "rightsizing", "cloudwatch"],
        },
        {
          id: "m3-dynamodb-elasticache-04",
          moduleId: "3",
          front:
            "What discount do ElastiCache Reserved Nodes provide over On-Demand?",
          back: "Approximately 40% savings for 1-year and 55% for 3-year Reserved Node commitments versus On-Demand node pricing.",
          tags: ["elasticache", "reserved-nodes", "cost"],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m3-q1",
      text: "Which AWS service analyzes 14 days of CloudWatch metrics and uses ML to recommend optimal EC2 instance types?",
      options: [
        "AWS Cost Explorer Rightsizing Recommendations",
        "AWS Compute Optimizer",
        "AWS Trusted Advisor",
        "AWS Systems Manager Inventory",
      ],
      correctIndex: 1,
      explanation:
        "AWS Compute Optimizer uses machine learning applied to 14 days of CloudWatch metrics to recommend optimal instance types for EC2, Auto Scaling groups, EBS volumes, Lambda functions, and ECS on Fargate. Cost Explorer also has rightsizing recommendations but they are less detailed and do not use ML in the same way.",
    },
    {
      id: "m3-q2",
      text: "A Lambda function currently allocated 128 MB takes 2,000ms to complete. After increasing memory to 512 MB, it completes in 400ms. What is the effect on cost?",
      options: [
        "Cost increases because more memory is allocated",
        "Cost stays the same because GB-seconds are identical",
        "Cost decreases because the GB-second total is lower",
        "Cost depends only on the number of requests, not duration",
      ],
      correctIndex: 2,
      explanation:
        "GB-seconds = memory (GB) × duration (seconds). At 128 MB: 0.125 GB × 2.0 s = 0.25 GB-sec. At 512 MB: 0.5 GB × 0.4 s = 0.20 GB-sec. The 512 MB configuration is cheaper because the duration reduction more than offsets the memory increase. This is a classic Lambda Power Tuning outcome for CPU-bound functions.",
    },
    {
      id: "m3-q3",
      text: "What is the primary cost advantage of EBS gp3 over gp2?",
      options: [
        "gp3 supports higher maximum IOPS (16,000 vs 3,000)",
        "gp3 is approximately 20% cheaper and decouples IOPS provisioning from storage size",
        "gp3 supports multi-attach for shared storage across EC2 instances",
        "gp3 has lower latency because it uses NVMe over TCP",
      ],
      correctIndex: 1,
      explanation:
        "gp3 is about 20% cheaper per GB than gp2 and provides 3,000 IOPS and 125 MB/s baseline throughput for free, independent of volume size. With gp2, IOPS scale at 3 IOPS/GB, so getting 3,000 IOPS requires a 1 TB volume. With gp3, you get 3,000 IOPS on a 1 GB volume. Additional IOPS and throughput can be provisioned separately.",
    },
    {
      id: "m3-q4",
      text: "Which Aurora configuration can pause to zero capacity (no ACU charges) when idle?",
      options: [
        "Aurora Serverless v2 with minimum ACU set to 0",
        "Aurora Serverless v1",
        "Aurora Provisioned with Instance Auto Scaling",
        "Aurora Global Database with one region disabled",
      ],
      correctIndex: 1,
      explanation:
        "Aurora Serverless v1 supports pausing to zero capacity after a configurable inactivity period, resulting in no compute charges while paused (only storage). Aurora Serverless v2 cannot pause to zero — it always maintains at least the minimum ACU setting (minimum 0.5 ACU), meaning there is always a compute charge.",
    },
    {
      id: "m3-q5",
      text: "A DynamoDB table has stable, predictable traffic. Which combination provides the maximum cost savings?",
      options: [
        "On-Demand mode with DAX caching",
        "Provisioned mode with Auto Scaling only",
        "Provisioned mode with Reserved Capacity",
        "On-Demand mode with Global Tables",
      ],
      correctIndex: 2,
      explanation:
        "For predictable traffic, Provisioned mode is significantly cheaper than On-Demand per request. Adding Reserved Capacity (1-year or 3-year commitment) reduces provisioned throughput costs by up to 76% compared to On-Demand pricing. Auto Scaling without Reserved Capacity still helps avoid over-provisioning but doesn't provide the RI discount.",
    },
  ],
};
