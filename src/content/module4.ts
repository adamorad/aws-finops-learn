import type { Module } from "../types/content";

export const module4: Module = {
  id: "4",
  title: "Cost Optimization Pt. 2",
  subtitle: "Networking, Analytics & Containers",
  description:
    "Learn how to eliminate hidden networking charges, optimize analytics query costs, and run containers efficiently using Spot, Karpenter, and right-sized node groups.",
  icon: "Network",
  sections: [
    {
      id: "data-transfer",
      title: "Data Transfer Costs",
      estimatedMinutes: 10,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Understanding AWS Data Transfer Pricing",
        },
        {
          type: "paragraph",
          text: "Data transfer is one of the most opaque cost areas in AWS. Charges depend on the direction of traffic (inbound is free, outbound is not), the source and destination (same AZ, cross-AZ, cross-region, or internet), and the service involved. Small per-GB rates compound quickly at scale.",
        },
        {
          type: "table",
          headers: ["Traffic Type", "Approximate Cost", "Notes"],
          rows: [
            ["Inbound from internet", "$0.00/GB", "Always free"],
            [
              "Same-AZ, same service",
              "$0.00/GB",
              "e.g., EC2 to EC2 in same AZ",
            ],
            [
              "Cross-AZ",
              "$0.01/GB each direction",
              "Both sides charged; $0.02/GB round trip",
            ],
            ["Cross-region (US)", "~$0.02/GB", "Varies by region pair"],
            [
              "Internet egress (first 10 TB)",
              "$0.09/GB",
              "Tiered discounts above 10 TB",
            ],
            [
              "CloudFront egress to internet",
              "~$0.0085/GB",
              "Lower than direct EC2 egress",
            ],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Cross-AZ charges are the most common surprise",
          text: "Both the sender and receiver are charged $0.01/GB for cross-AZ traffic, resulting in $0.02/GB per round-trip. Architectures that spread microservices or data tiers across AZs without locality awareness can generate significant unexpected charges. Use the AWS Cost and Usage Report with the `product/fromLocation` and `product/toLocation` fields to identify cross-AZ flows.",
        },
        {
          type: "heading",
          level: 3,
          text: "VPC Endpoints to Reduce NAT Gateway Costs",
        },
        {
          type: "paragraph",
          text: "**NAT Gateway** charges $0.045/hr plus $0.045/GB processed. Traffic from private subnets to AWS services like S3 and DynamoDB routes through the NAT Gateway by default, incurring both the per-GB data processing charge and the internet egress charge. **Gateway VPC Endpoints** for S3 and DynamoDB are free — they route traffic over the AWS private network without touching the NAT Gateway.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Create Gateway VPC Endpoints for S3 and DynamoDB immediately",
          text: "Gateway endpoints for S3 and DynamoDB are always free and take under a minute to create. Add them to your route tables in every VPC that has private subnets. This is one of the highest-ROI, lowest-effort cost reductions available.",
        },
        {
          type: "heading",
          level: 3,
          text: "CloudFront for Egress Reduction",
        },
        {
          type: "paragraph",
          text: "CloudFront egress pricing (~$0.0085/GB for the first 10 TB/month to internet) is approximately 85% cheaper than direct EC2 or ALB internet egress ($0.09/GB). For applications serving static or cacheable content globally, placing CloudFront in front of an S3 origin or ALB dramatically reduces egress costs while improving latency.",
        },
      ],
      flashcards: [
        {
          id: "m4-data-transfer-01",
          moduleId: "4",
          front:
            "How much does cross-AZ data transfer cost per GB total (both directions)?",
          back: "Approximately $0.02/GB total. Both the sender and receiver are charged $0.01/GB each for cross-AZ traffic. This applies to EC2 instances, RDS, ElastiCache, and other services in different AZs within the same region.",
          tags: ["data-transfer", "cross-az", "networking"],
        },
        {
          id: "m4-data-transfer-02",
          moduleId: "4",
          front:
            "Why should you create Gateway VPC Endpoints for S3 and DynamoDB?",
          back: "Gateway endpoints route traffic over the AWS private network instead of through the NAT Gateway, eliminating the $0.045/GB NAT Gateway data processing charge and internet egress charges for that traffic. Gateway endpoints for S3 and DynamoDB are completely free.",
          tags: ["vpc-endpoints", "nat-gateway", "s3", "dynamodb", "cost"],
        },
        {
          id: "m4-data-transfer-03",
          moduleId: "4",
          front:
            "How much cheaper is CloudFront internet egress vs direct EC2/ALB egress?",
          back: "CloudFront egress to internet costs approximately $0.0085/GB (first 10 TB/month) versus $0.09/GB for direct EC2 internet egress — roughly 90% cheaper. CloudFront also includes free origin fetch from S3 and reduced latency via edge caching.",
          tags: ["cloudfront", "egress", "cost", "data-transfer"],
        },
        {
          id: "m4-data-transfer-04",
          moduleId: "4",
          front:
            "Which CUR fields help identify cross-AZ data transfer charges in AWS Cost and Usage Reports?",
          back: "`product/fromLocation` and `product/toLocation` identify the source and destination of data transfer. Filter for rows where both are in the same region but different AZs to quantify cross-AZ traffic costs.",
          tags: ["cur", "data-transfer", "cost-analysis"],
        },
      ],
    },
    {
      id: "networking-cost",
      title: "Networking Cost Optimization",
      estimatedMinutes: 10,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "NAT Gateway vs VPC Endpoints",
        },
        {
          type: "paragraph",
          text: "NAT Gateway is a managed service that enables instances in private subnets to reach the internet. It charges $0.045/hr per gateway (roughly $32/month per AZ) plus $0.045/GB of data processed. For traffic destined to AWS services, VPC endpoints eliminate both charges.",
        },
        {
          type: "table",
          headers: ["Endpoint Type", "Services", "Cost", "Use When"],
          rows: [
            [
              "Gateway endpoint",
              "S3, DynamoDB",
              "Free",
              "Always — no reason not to",
            ],
            [
              "Interface endpoint (PrivateLink)",
              "Most AWS services",
              "$0.01/hr + $0.01/GB",
              "High NAT Gateway data processing costs",
            ],
            [
              "NAT Gateway",
              "Any internet destination",
              "$0.045/hr + $0.045/GB",
              "Public internet access required",
            ],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Interface endpoints have a break-even point",
          text: "Interface endpoints (PrivateLink) cost $0.01/hr per AZ plus $0.01/GB data processed. An interface endpoint breaks even vs NAT Gateway data processing costs when monthly data through the gateway exceeds approximately 32 GB per AZ. Calculate your actual NAT Gateway data-processed costs from Cost Explorer before creating interface endpoints.",
        },
        {
          type: "heading",
          level: 3,
          text: "VPN vs Direct Connect Cost Comparison",
        },
        {
          type: "paragraph",
          text: "**AWS Site-to-Site VPN** runs over the public internet and charges ~$0.05/hr per connection plus data transfer out at standard rates. **AWS Direct Connect** provides dedicated private network capacity at 1 Gbps or 10 Gbps ports, with lower data transfer rates but significant port-hour charges.",
        },
        {
          type: "table",
          headers: ["Attribute", "Site-to-Site VPN", "Direct Connect (1 Gbps)"],
          rows: [
            [
              "Port/connection charge",
              "~$0.05/hr (~$36/mo)",
              "~$0.30/hr (~$216/mo) for port",
            ],
            [
              "Data out rate",
              "Standard egress rates",
              "~$0.02/GB (Direct Connect rate)",
            ],
            [
              "Break-even (data out)",
              "N/A (cheaper at low volume)",
              "~10 TB/month vs VPN + standard egress",
            ],
            ["Latency", "Variable (internet)", "Consistent, low"],
            ["Bandwidth", "Up to ~1.25 Gbps", "1 or 10 Gbps dedicated"],
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Elastic IP Idle Charges",
        },
        {
          type: "paragraph",
          text: "Elastic IPs (EIPs) are free when associated with a running EC2 instance. However, an EIP that is **not associated with a running instance** costs $0.005/hr (~$3.60/month). This charge exists to discourage IP hoarding. Unused EIPs accumulate silently — audit and release them regularly.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Audit Elastic IPs with AWS Config",
          text: "Use the `eip-attached` AWS Config managed rule to flag Elastic IPs that are not attached to a running instance. Set up an SNS alert or a Lambda remediation to notify your team when unattached EIPs are detected.",
        },
        {
          type: "heading",
          level: 3,
          text: "Load Balancer Selection",
        },
        {
          type: "paragraph",
          text: "AWS offers three load balancer types: Application (ALB), Network (NLB), and Gateway (GWLB). Each has different pricing. Avoid running idle or lightly used load balancers — the hourly charge ($0.008–$0.022/hr depending on type) and LCU/NLCU charges add up for low-traffic workloads.",
        },
        {
          type: "bullet-list",
          items: [
            "ALB: $0.008/hr + $0.008/LCU-hr. Best for HTTP/HTTPS traffic with path/host-based routing.",
            "NLB: $0.006/hr + $0.006/NLCU-hr. Best for TCP/UDP at high throughput or static IP requirements.",
            "Consolidate multiple ALBs using host-based and path-based routing rules — one ALB can serve many services.",
            "Delete load balancers in dev/test environments when not in use, or create them on-demand via infrastructure-as-code.",
          ],
        },
      ],
      flashcards: [
        {
          id: "m4-networking-cost-01",
          moduleId: "4",
          front:
            "At approximately what monthly data volume does a PrivateLink Interface endpoint become cheaper than NAT Gateway data processing for a single service?",
          back: "Approximately 32 GB/month per AZ. Interface endpoints cost $0.01/hr (~$7.20/mo) + $0.01/GB, vs NAT Gateway data processing at $0.045/GB. The crossover is around 32 GB/month where the interface endpoint fixed cost is recovered by the $0.035/GB savings.",
          tags: ["vpc-endpoints", "privatelink", "nat-gateway", "cost"],
        },
        {
          id: "m4-networking-cost-02",
          moduleId: "4",
          front: "What does an unattached Elastic IP cost per month?",
          back: "Approximately $3.60/month ($0.005/hr × 720 hours). Elastic IPs are free only when associated with a running EC2 instance. Audit for unattached EIPs using the AWS Config `eip-attached` managed rule.",
          tags: ["elastic-ip", "networking", "cost"],
        },
        {
          id: "m4-networking-cost-03",
          moduleId: "4",
          front:
            "When does Direct Connect become cheaper than Site-to-Site VPN for data transfer?",
          back: "When monthly outbound data exceeds approximately 10 TB, the lower Direct Connect data transfer rate (~$0.02/GB) begins to offset the higher port-hour charge (~$0.30/hr for 1 Gbps). The break-even depends on your region and the standard egress rate you are currently paying.",
          tags: ["direct-connect", "vpn", "networking", "cost"],
        },
        {
          id: "m4-networking-cost-04",
          moduleId: "4",
          front: "How can you reduce ALB costs for multiple internal services?",
          back: "Consolidate services behind a single ALB using host-based routing (different hostnames) and path-based routing (different URL paths). One ALB can serve many services, eliminating per-ALB hourly charges for each additional load balancer.",
          tags: ["alb", "load-balancer", "networking", "cost"],
        },
      ],
    },
    {
      id: "analytics-cost",
      title: "Analytics Service Optimization",
      estimatedMinutes: 12,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Athena Query Cost Optimization",
        },
        {
          type: "paragraph",
          text: "Amazon Athena charges $5.00 per TB of data scanned (per-query engine). Reducing data scanned is the primary cost lever. Three techniques have the highest impact: **partitioning**, **columnar file formats**, and **query optimization**.",
        },
        {
          type: "table",
          headers: [
            "Technique",
            "Typical Scan Reduction",
            "Implementation Effort",
          ],
          rows: [
            [
              "Partition by date/region",
              "50–99% (query-dependent)",
              "Low — add partition columns to table",
            ],
            [
              "Convert to Parquet/ORC",
              "60–87% vs CSV/JSON",
              "Medium — ETL job or CTAS",
            ],
            [
              "Enable compression (Snappy, ZSTD)",
              "20–60% additional",
              "Low — set at write time",
            ],
            [
              "Use partition projection",
              "Eliminates partition metadata overhead",
              "Medium — Glue table properties",
            ],
            [
              "LIMIT queries during exploration",
              "Variable",
              "Low — developer discipline",
            ],
          ],
        },
        {
          type: "callout",
          variant: "important",
          title: "Always partition before converting to columnar",
          text: "Partitioning and columnar format are multiplicative: a query filtering on date against a date-partitioned Parquet table may scan 99% less data than a full-table CSV scan. Implement partitioning first as it requires no data rewrite, then convert to Parquet via CTAS or an AWS Glue job.",
        },
        {
          type: "heading",
          level: 3,
          text: "Redshift Optimization",
        },
        {
          type: "paragraph",
          text: "Amazon Redshift charges by node-hour for provisioned clusters, or per RPU-second for Redshift Serverless. Provisioned cluster costs can be optimized through Reserved Nodes, pause/resume automation, and the RA3 node type.",
        },
        {
          type: "bullet-list",
          items: [
            "**RA3 nodes**: Separate compute from storage. Storage is billed at $0.024/GB-month (Redshift Managed Storage), allowing you to scale compute independently. Migrate from DC2 nodes to RA3 for variable workloads.",
            "**Reserved Nodes**: 1-year All Upfront saves ~42%; 3-year saves ~75% vs On-Demand node pricing.",
            "**Pause/Resume**: Paused clusters incur no compute charge (only Redshift Managed Storage). Schedule pause/resume for dev/test clusters that are only needed during business hours.",
            "**Concurrency Scaling**: Redshift automatically adds transient capacity during query bursts. The first 1 hour of concurrency scaling per day is free; additional time is billed at On-Demand node rates.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Use Redshift Advisor for cluster recommendations",
          text: "Redshift Advisor analyzes query patterns and cluster health to provide recommendations such as enabling compression, changing sort keys, rebuilding stale statistics, and identifying skewed tables. Access it from the Redshift console under the cluster's Advisor tab — it is free and continuously updated.",
        },
        {
          type: "heading",
          level: 3,
          text: "EMR Cost Optimization with Spot Instances",
        },
        {
          type: "paragraph",
          text: "Amazon EMR clusters consist of master, core, and task nodes. **Spot Instances** are ideal for task nodes, which run MapReduce/Spark tasks but do not store HDFS data. If a Spot Instance is reclaimed, EMR reschedules the affected tasks on other nodes — no data is lost.",
        },
        {
          type: "table",
          headers: ["Node Role", "Spot Suitable?", "Reason"],
          rows: [
            ["Master", "No", "Manages cluster; interruption terminates job"],
            [
              "Core",
              "With caution",
              "Stores HDFS data; interruption risks data loss",
            ],
            [
              "Task",
              "Yes (recommended)",
              "Stateless; tasks rescheduled on interruption",
            ],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Use instance fleets for better Spot availability",
          text: "EMR instance fleets let you specify multiple instance types and Spot allocation strategies (e.g., capacity-optimized). This increases the chance of fulfillment and reduces interruption risk compared to a single instance type.",
        },
      ],
      flashcards: [
        {
          id: "m4-analytics-cost-01",
          moduleId: "4",
          front:
            "What is the Athena pricing model and what is the primary way to reduce costs?",
          back: "Athena charges $5.00 per TB of data scanned per query. The primary cost reduction strategies are: 1) partition data (filter to relevant partitions), 2) use columnar formats (Parquet/ORC scan only queried columns), 3) compress data. These can reduce scanned data by 90%+ and thus costs proportionally.",
          tags: ["athena", "analytics", "cost", "partitioning"],
        },
        {
          id: "m4-analytics-cost-02",
          moduleId: "4",
          front:
            "What is the key advantage of Redshift RA3 nodes for cost optimization?",
          back: "RA3 nodes separate compute from storage. Storage uses Redshift Managed Storage (billed at $0.024/GB-month) independently of compute node count. This allows you to scale compute down without losing data, and pause clusters to zero compute cost while retaining all data.",
          tags: ["redshift", "ra3", "analytics", "cost"],
        },
        {
          id: "m4-analytics-cost-03",
          moduleId: "4",
          front:
            "Why are Spot Instances safe for EMR task nodes but risky for core nodes?",
          back: "Task nodes are stateless — they only run computation. If interrupted, EMR reschedules tasks on remaining nodes with no data loss. Core nodes store HDFS data; interruption can cause data loss or block cluster recovery, making On-Demand or Spot with higher bid advisable.",
          tags: ["emr", "spot", "task-nodes", "analytics"],
        },
        {
          id: "m4-analytics-cost-04",
          moduleId: "4",
          front:
            "How much does Redshift Reserved Node (3-year) save vs On-Demand?",
          back: "Approximately 75% savings with a 3-year All Upfront Reserved Node commitment. 1-year All Upfront saves approximately 42%. Always rightsize the cluster first — an RI on an over-provisioned cluster still wastes money.",
          tags: ["redshift", "reserved-nodes", "cost"],
        },
      ],
    },
    {
      id: "containers-cost",
      title: "Container Cost Optimization",
      estimatedMinutes: 12,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "ECS Fargate vs EC2 Launch Type",
        },
        {
          type: "paragraph",
          text: "ECS supports two launch types: **Fargate** (serverless, pay per vCPU and memory per second) and **EC2** (you manage the underlying instances). The cost trade-off depends on utilization density and workload predictability.",
        },
        {
          type: "table",
          headers: ["Attribute", "Fargate", "EC2 Launch Type"],
          rows: [
            ["Billing unit", "vCPU-sec + GB-sec", "EC2 instance-hour"],
            [
              "Bin-packing",
              "None — exact allocation",
              "Multiple tasks per instance",
            ],
            [
              "Idle cost",
              "Zero (no tasks running)",
              "EC2 instance runs continuously",
            ],
            [
              "Overhead",
              "No cluster management",
              "Manage AMI, ECS agent, scaling",
            ],
            [
              "Spot support",
              "Fargate Spot (~70% discount)",
              "EC2 Spot instances",
            ],
            [
              "Break-even vs EC2",
              "~30–40% utilization",
              "Above ~40% utilization EC2 is cheaper",
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Use Fargate Spot for fault-tolerant workloads",
          text: "Fargate Spot can reduce Fargate costs by up to 70% for tasks that can tolerate interruptions (batch processing, background workers, CI jobs). Combine a base capacity of On-Demand Fargate with Fargate Spot for burst capacity using a capacity provider strategy with `base` and `weight` settings.",
        },
        {
          type: "heading",
          level: 3,
          text: "EKS Node Group Strategies",
        },
        {
          type: "paragraph",
          text: "EKS itself charges $0.10/hr per cluster. The dominant cost is EC2 instances in node groups. Optimizing node groups involves choosing the right instance type, mixing On-Demand and Spot, and right-sizing node capacity so that bin-packing is efficient.",
        },
        {
          type: "bullet-list",
          items: [
            "Use **Managed Node Groups** over self-managed — they support automatic node rolling updates and integrate with EC2 Auto Scaling.",
            "Separate On-Demand nodes (for stateful, latency-sensitive workloads) from Spot nodes (for stateless, batch workloads) using node selectors and taints.",
            "Use instance families from multiple generations and sizes in Spot node groups to maximize availability (e.g., m5.xlarge, m5a.xlarge, m6i.xlarge, m4.xlarge).",
            "Enable **Graviton/ARM64 node groups** (m7g, c7g) for compatible workloads — Graviton instances offer ~20% better price/performance than equivalent x86.",
            "Right-size pod resource requests (`resources.requests`) — Kubernetes schedules pods based on requests, so inflated requests cause wasteful bin-packing and higher node count.",
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Karpenter for Efficient Bin-Packing",
        },
        {
          type: "paragraph",
          text: "**Karpenter** is an open-source Kubernetes node autoscaler that replaces the Cluster Autoscaler for EKS. It provisions the smallest set of nodes that satisfies pending pod requirements, choosing from a broad range of instance types rather than a fixed node group. This results in tighter bin-packing and lower total instance cost.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Karpenter consolidation reduces idle node cost",
          text: "Karpenter's consolidation feature continuously evaluates running nodes and replaces fragmented nodes (low utilization) with fewer, fuller nodes. This is equivalent to ongoing rightsizing of your cluster compute without manual intervention. Enable `consolidationPolicy: WhenUnderutilized` in your NodePool spec.",
        },
        {
          type: "callout",
          variant: "important",
          title: "Set pod disruption budgets before enabling consolidation",
          text: "Karpenter consolidation drains and terminates nodes, which evicts pods. Without PodDisruptionBudgets (PDBs), consolidation can cause brief service interruptions. Define PDBs for all production workloads specifying `minAvailable` or `maxUnavailable` before enabling consolidation.",
        },
        {
          type: "heading",
          level: 3,
          text: "Spot for Stateless Workloads",
        },
        {
          type: "paragraph",
          text: "EC2 Spot Instances offer discounts of 50–90% vs On-Demand for the same instance type. Kubernetes handles Spot interruptions gracefully when workloads are stateless: the Spot interruption notice (2-minute warning via instance metadata or EventBridge) allows the node to drain, rescheduling pods onto other nodes.",
        },
        {
          type: "table",
          headers: ["Workload Type", "Spot Suitable?", "Mitigation Strategy"],
          rows: [
            [
              "Stateless web API",
              "Yes",
              "Multiple replicas across AZs and node groups",
            ],
            [
              "Batch / data processing",
              "Yes (ideal)",
              "Checkpointing; restart from checkpoint on interruption",
            ],
            [
              "Stateful database",
              "No",
              "Use On-Demand; data loss risk on interruption",
            ],
            [
              "Machine learning inference",
              "Conditional",
              "Multi-replica deployment; On-Demand fallback",
            ],
            [
              "CI/CD build runners",
              "Yes",
              "Jobs re-queued on failure; large Spot savings",
            ],
          ],
        },
      ],
      flashcards: [
        {
          id: "m4-containers-cost-01",
          moduleId: "4",
          front:
            "At what approximate utilization rate does ECS EC2 launch type become cheaper than Fargate?",
          back: "Above approximately 40% sustained utilization, EC2 launch type becomes cheaper than Fargate because you can bin-pack multiple tasks on shared instances. Below ~40%, Fargate is often cheaper because you don't pay for idle EC2 capacity.",
          tags: ["ecs", "fargate", "ec2", "containers", "cost"],
        },
        {
          id: "m4-containers-cost-02",
          moduleId: "4",
          front:
            "What is Karpenter and how does it reduce EKS costs vs Cluster Autoscaler?",
          back: "Karpenter is an open-source Kubernetes node autoscaler that selects the optimal instance type from a broad range to satisfy pending pod requirements. Unlike Cluster Autoscaler (which scales predefined node groups), Karpenter bins-packs more efficiently and uses consolidation to continuously replace fragmented nodes with fewer, fuller ones.",
          tags: ["karpenter", "eks", "kubernetes", "autoscaling", "cost"],
        },
        {
          id: "m4-containers-cost-03",
          moduleId: "4",
          front:
            "What is the maximum discount for Fargate Spot vs standard Fargate?",
          back: "Fargate Spot can be up to 70% cheaper than On-Demand Fargate. It is suitable for fault-tolerant, interruption-tolerant tasks like batch jobs, background workers, and CI builds. Tasks receive a 2-minute stop notice before termination.",
          tags: ["fargate", "spot", "containers", "cost"],
        },
        {
          id: "m4-containers-cost-04",
          moduleId: "4",
          front:
            "Why do inflated Kubernetes pod resource requests increase cluster costs?",
          back: "Kubernetes schedules pods based on `resources.requests`, not actual usage. If requests are set higher than actual consumption, the scheduler treats the node as full before it is, causing new pods to schedule on new nodes instead of packing onto existing ones. This results in more nodes and higher cost.",
          tags: [
            "kubernetes",
            "eks",
            "resource-requests",
            "bin-packing",
            "cost",
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m4-q1",
      text: "An EC2 instance in a private subnet makes API calls to Amazon S3. Currently this traffic routes through a NAT Gateway at $0.045/GB. What is the most cost-effective fix?",
      options: [
        "Move the EC2 instance to a public subnet and assign an Elastic IP",
        "Create a Gateway VPC Endpoint for S3 and update the route table",
        "Create an Interface VPC Endpoint for S3 using PrivateLink",
        "Enable S3 Transfer Acceleration to reduce costs",
      ],
      correctIndex: 1,
      explanation:
        "Gateway VPC Endpoints for S3 (and DynamoDB) are completely free. They route traffic directly from the VPC to S3 over the AWS private network without traversing the NAT Gateway, eliminating the $0.045/GB data processing charge. Interface endpoints (PrivateLink) also work but cost $0.01/hr + $0.01/GB, making them more expensive than the free gateway endpoint for S3.",
    },
    {
      id: "m4-q2",
      text: "Your team queries a large CSV dataset in S3 with Athena daily. Queries take 2 minutes and scan 500 GB. What single change provides the greatest cost reduction?",
      options: [
        "Enable S3 Requester Pays on the bucket",
        "Increase the Athena query result cache TTL to 24 hours",
        "Convert the dataset to Parquet with Snappy compression and partition by date",
        "Run queries using Athena JDBC driver instead of console",
      ],
      correctIndex: 2,
      explanation:
        "Converting to Parquet (columnar format) with compression typically reduces data scanned by 60–87% because Athena reads only the columns referenced in the query. Adding date partitioning further reduces scanned data by skipping irrelevant partitions. Combined, these can reduce 500 GB scans to under 50 GB, cutting costs by 90%+. Athena charges $5.00/TB scanned, so this has a direct proportional impact.",
    },
    {
      id: "m4-q3",
      text: "Which EMR node role is safest to run on Spot Instances without risk of data loss?",
      options: [
        "Master node — it coordinates the cluster",
        "Core node — it has the most memory",
        "Task node — it runs computation without storing HDFS data",
        "All roles are equally safe on Spot",
      ],
      correctIndex: 2,
      explanation:
        "Task nodes are stateless — they run MapReduce or Spark tasks but do not store HDFS data. If a Spot task node is reclaimed, EMR reschedules the interrupted tasks on remaining nodes without data loss. Core nodes store HDFS blocks; interrupting a core node can cause HDFS block loss or require cluster recovery. Master node interruption terminates the entire cluster job.",
    },
    {
      id: "m4-q4",
      text: "A Kubernetes workload has `resources.requests.cpu: 2000m` set but consistently uses only 200m. What is the cost impact?",
      options: [
        "No impact — Kubernetes charges only for actual CPU used",
        "Nodes appear full sooner, forcing new pod scheduling onto additional nodes, increasing cluster cost",
        "Kubernetes automatically adjusts requests to match actual usage after 15 minutes",
        "The pod is throttled to 200m CPU to match actual usage",
      ],
      correctIndex: 1,
      explanation:
        "Kubernetes schedules pods based on `resources.requests`, not actual usage. A pod requesting 2000m CPU on a 4-vCPU node occupies 50% of the schedulable capacity even if it only uses 200m. Other pods cannot be scheduled on the remaining 1800m because it is 'reserved', forcing the cluster autoscaler to provision new nodes. This wastes 90% of the reserved CPU, increasing node count and cost.",
    },
    {
      id: "m4-q5",
      text: "Which Karpenter feature continuously replaces lightly used nodes with fewer, more densely packed nodes?",
      options: [
        "NodePool prioritization",
        "Drift detection",
        "Consolidation",
        "Spot fallback",
      ],
      correctIndex: 2,
      explanation:
        "Karpenter's consolidation feature continuously evaluates the cluster and replaces underutilized nodes by evicting pods and rescheduling them onto fewer, fuller nodes, then terminating the empty nodes. This is configured with `consolidationPolicy: WhenUnderutilized` in the NodePool spec. PodDisruptionBudgets must be set for production workloads to control eviction behavior.",
    },
  ],
};
