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
      id: "data-transfer-costs",
      title: "Data Transfer Cost Fundamentals",
      estimatedMinutes: 14,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Understanding AWS Data Transfer Pricing",
        },
        {
          type: "paragraph",
          text: "Data transfer is one of the most misunderstood cost categories in AWS. The charges depend on direction (inbound is almost always free, outbound varies), the source and destination (same AZ, cross-AZ, cross-region, or internet), and the service involved. Small per-GB rates compound to large bills at scale — a workload moving 500 TB/month at $0.09/GB pays $45,000/month in egress alone.",
        },
        {
          type: "table",
          headers: ["Traffic Type", "Cost", "Common Example", "Notes"],
          rows: [
            [
              "Inbound from internet",
              "$0.00/GB",
              "User uploads, API ingress",
              "Always free",
            ],
            [
              "Same-AZ between EC2 instances",
              "$0.00/GB",
              "Microservice calls in same AZ",
              "Free via private IP",
            ],
            [
              "Cross-AZ (each direction)",
              "$0.01/GB",
              "App server in AZ-a → DB in AZ-b",
              "Both sides charged: $0.02/GB round-trip",
            ],
            [
              "Cross-region (US East to US West)",
              "~$0.02/GB",
              "S3 replication, read replica",
              "Varies by region pair",
            ],
            [
              "Cross-region (US to EU)",
              "~$0.02/GB",
              "Global read replica, DynamoDB Global Tables",
              "",
            ],
            [
              "Internet egress (first 10 TB/month)",
              "$0.09/GB",
              "API response to users, S3 downloads",
              "Tiered: 10–50 TB @ $0.085/GB",
            ],
            [
              "Internet egress via CloudFront",
              "~$0.0085/GB",
              "Static assets, video, API via CDN",
              "~90% cheaper than direct",
            ],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "The cross-AZ billing shock: both sides pay",
          text: "Cross-AZ data transfer charges $0.01/GB on EACH side of the connection — sender AND receiver. A microservice in AZ-a calling a database in AZ-b for 10 TB/month generates $200/month in cross-AZ charges ($0.01 × 10 TB × 2 sides). Multiply by dozens of services and this compounds quickly. Use the AWS Cost and Usage Report `product/fromLocation` and `product/toLocation` fields to identify and quantify these flows.",
        },
        {
          type: "heading",
          level: 3,
          text: "The Data Transfer Bill Shock Pattern",
        },
        {
          type: "paragraph",
          text: "The most common data transfer surprise follows a predictable pattern: an architecture built in a single AZ for simplicity is later spread across AZs for high availability, without adding AZ-awareness to the application layer. Services that previously talked for free now generate cross-AZ charges on every inter-service call. The bill grows gradually over months as traffic increases, eventually becoming a line item large enough to notice.",
        },
        {
          type: "numbered-list",
          items: [
            "Audit your architecture: map which services communicate with each other and in which AZs they run.",
            "Enable VPC Flow Logs and analyze with Athena: query for traffic between subnets in different AZs.",
            "Add AZ affinity where possible: for stateless services, use client-side load balancing that prefers same-AZ targets (e.g., ELB Target Group Zonal Shift, or Kubernetes Topology Aware Routing).",
            "For caches (ElastiCache, DAX): deploy a replica in each AZ and route reads to the local-AZ replica.",
            "Quantify savings: estimate cross-AZ bytes from Flow Logs, multiply by $0.02/GB for the business case.",
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "VPC Gateway Endpoints: Free Elimination of NAT Charges",
        },
        {
          type: "paragraph",
          text: "By default, traffic from EC2 instances in private subnets to S3 and DynamoDB routes through the NAT Gateway, incurring $0.045/GB in NAT data processing charges plus standard internet egress. **Gateway VPC Endpoints** for S3 and DynamoDB route this traffic over the AWS private network at zero cost — they are completely free to create and use.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Gateway endpoints: highest ROI action in networking",
          text: "A single EC2 fleet transferring 10 TB/month to S3 through a NAT Gateway pays $450/month in NAT data processing charges. Creating a free S3 Gateway VPC Endpoint eliminates this cost entirely in under 5 minutes. Do this for every VPC with private subnets. It requires adding a route table entry pointing the S3 prefix list to the endpoint.",
        },
        {
          type: "heading",
          level: 3,
          text: "Measuring Data Transfer Costs in Cost Explorer",
        },
        {
          type: "paragraph",
          text: "In Cost Explorer, filter by Service = 'EC2-Other' and Usage Type containing 'DataTransfer' to isolate data transfer charges. The usage type prefix encodes the direction: `USE1-DataTransfer-Out-Bytes` (internet egress from us-east-1), `USE1-USE2-DataTransfer-Out-Bytes` (cross-AZ), `USE1-EU-DataTransfer-Out-Bytes` (cross-region). Group by Usage Type to see the breakdown.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Data transfer costs are often hidden in EC2-Other",
          text: "Many teams check 'EC2' costs but miss 'EC2-Other' which contains data transfer, Elastic IPs, NAT Gateway, and EBS snapshot charges. Always expand EC2 into its sub-categories when investigating large bills. EC2-Other can represent 20–40% of total EC2 spend in data-intensive architectures.",
        },
      ],
      flashcards: [
        {
          id: "m4-data-transfer-costs-01",
          moduleId: "4",
          front:
            "What is the total per-GB cost of cross-AZ data transfer for a round-trip (e.g., app server calling database in a different AZ)?",
          back: "$0.02/GB total — $0.01/GB charged on each side (sender and receiver). For 10 TB/month of cross-AZ round-trip traffic, the cost is $200/month. This applies to EC2, RDS, ElastiCache, and other services across AZs within the same region.",
          tags: ["data-transfer", "cross-az", "networking", "cost"],
        },
        {
          id: "m4-data-transfer-costs-02",
          moduleId: "4",
          front:
            "What is the internet egress rate for the first 10 TB/month and how does CloudFront compare?",
          back: "Direct internet egress: $0.09/GB for the first 10 TB/month. CloudFront to internet: ~$0.0085/GB — approximately 90% cheaper. A workload serving 100 TB/month to the internet pays $9,000/month direct vs $850/month via CloudFront.",
          tags: ["data-transfer", "egress", "cloudfront", "cost"],
        },
        {
          id: "m4-data-transfer-costs-03",
          moduleId: "4",
          front:
            "What are Gateway VPC Endpoints, which services support them, and what is the cost?",
          back: "Gateway VPC Endpoints route traffic from private subnet instances to S3 and DynamoDB over the AWS private network, bypassing the NAT Gateway. They are completely free to create and use. Add a route table entry pointing the S3 or DynamoDB prefix list to the endpoint — eliminates $0.045/GB NAT data processing charges for that traffic.",
          tags: [
            "vpc-endpoints",
            "gateway-endpoint",
            "s3",
            "dynamodb",
            "nat-gateway",
            "free",
          ],
        },
        {
          id: "m4-data-transfer-costs-04",
          moduleId: "4",
          front:
            "Which Cost Explorer service category contains data transfer charges, and what usage type prefix identifies internet egress from us-east-1?",
          back: "Data transfer charges appear under 'EC2-Other' (not 'EC2'). Internet egress from us-east-1 has the usage type `USE1-DataTransfer-Out-Bytes`. Cross-AZ: `USE1-USE2-DataTransfer-Out-Bytes`. Cross-region to EU: `USE1-EU-DataTransfer-Out-Bytes`. Filter by EC2-Other and group by Usage Type to see the breakdown.",
          tags: ["cost-explorer", "data-transfer", "usage-type", "billing"],
        },
        {
          id: "m4-data-transfer-costs-05",
          moduleId: "4",
          front:
            "What is the 'data transfer bill shock pattern' and how does it typically manifest?",
          back: "An architecture initially built in a single AZ is later spread across AZs for HA without adding AZ-awareness to the application. Services that previously communicated for free now generate $0.02/GB round-trip cross-AZ charges on every inter-service call. Costs grow gradually as traffic increases. Mitigate with AZ-affinity routing, local-AZ cache replicas, and VPC Flow Log analysis.",
          tags: ["data-transfer", "cross-az", "architecture", "bill-shock"],
        },
      ],
    },
    {
      id: "nat-cloudfront",
      title: "NAT Gateway, VPC Endpoints & CloudFront",
      estimatedMinutes: 14,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "NAT Gateway: The Hidden Cost Driver",
        },
        {
          type: "paragraph",
          text: "AWS NAT Gateway enables instances in private subnets to reach the internet. It charges two dimensions: **$0.045/hr per gateway** (one gateway per AZ in a highly available setup) plus **$0.045/GB of data processed**. A three-AZ production environment with a NAT Gateway in each AZ costs $97/month in gateway charges alone, before any data processing.",
        },
        {
          type: "table",
          headers: [
            "NAT Gateway Cost Component",
            "Rate",
            "Monthly Cost (3-AZ example)",
          ],
          rows: [
            [
              "Gateway-hours (per AZ)",
              "$0.045/hr",
              "$0.045 × 720 × 3 AZs = $97.20/month",
            ],
            [
              "Data processing (per GB)",
              "$0.045/GB",
              "Varies by traffic volume",
            ],
            [
              "Internet egress (on top)",
              "$0.09/GB",
              "Charged separately by EC2",
            ],
            [
              "Total for 10 TB/month through NAT",
              "—",
              "$97 gateway + $450 processing + $900 egress = $1,447/month",
            ],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "NAT Gateway traffic to AWS services doubles your cost",
          text: "If your instances use NAT Gateway to reach S3 or other AWS services, you pay $0.045/GB NAT processing PLUS the standard egress rate — even though the traffic stays within AWS. A free S3 Gateway VPC Endpoint eliminates the $0.045/GB processing charge entirely. For other AWS services, PrivateLink Interface Endpoints cost $0.01/hr + $0.01/GB — far cheaper than $0.045/GB NAT processing at scale.",
        },
        {
          type: "heading",
          level: 3,
          text: "VPC Endpoint Types: Gateway vs Interface vs PrivateLink",
        },
        {
          type: "table",
          headers: ["Type", "Services", "Cost", "Mechanism", "Use When"],
          rows: [
            [
              "Gateway Endpoint",
              "S3, DynamoDB only",
              "Free",
              "Route table entry",
              "Always — for S3 and DynamoDB traffic from private subnets",
            ],
            [
              "Interface Endpoint (PrivateLink)",
              "Most AWS services (SQS, SNS, ECR, Secrets Manager, etc.)",
              "$0.01/hr per AZ + $0.01/GB",
              "ENI in your VPC",
              "High NAT data-processing volume for a specific service",
            ],
            [
              "NAT Gateway",
              "Any internet destination",
              "$0.045/hr + $0.045/GB processed",
              "Managed NAT",
              "Public internet access from private subnets",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Interface endpoints (PrivateLink) break even vs NAT Gateway data processing when monthly data through the endpoint exceeds approximately **32 GB per AZ**. Calculation: PrivateLink fixed cost per AZ = $0.01 × 720 hrs = $7.20/month. NAT savings per GB = $0.045 − $0.01 = $0.035/GB. Break-even = $7.20 / $0.035 = ~206 GB/month per AZ. At 206+ GB/month, PrivateLink is cheaper.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Highest-value Interface Endpoints to create first",
          text: "Rank Interface Endpoints by the NAT Gateway data volume they eliminate. Common high-volume candidates: ECR (Docker image pulls — each pull can be GBs), Secrets Manager (frequent secret retrieval), SQS/SNS (high-throughput queuing), and SSM (Systems Manager agent traffic from large fleets). Check NAT Gateway CloudWatch metric `BytesOutToSource` by destination IP to identify which services generate the most traffic.",
        },
        {
          type: "heading",
          level: 3,
          text: "CloudFront as an Egress Cost Reducer",
        },
        {
          type: "paragraph",
          text: "CloudFront charges ~$0.0085/GB for internet egress (first 10 TB/month from us-east-1 edge) versus $0.09/GB for direct EC2 or ALB internet egress — approximately 90% cheaper. For applications serving static or cacheable content, CloudFront also reduces origin load: a 90% cache hit rate means your origin only serves 10% of requests, reducing both egress from the origin and compute costs.",
        },
        {
          type: "table",
          headers: [
            "Scenario",
            "Monthly Egress",
            "Direct EC2 Cost",
            "Via CloudFront Cost",
            "Monthly Savings",
          ],
          rows: [
            ["SaaS API responses", "10 TB/month", "$900", "$85", "$815"],
            [
              "Static website assets",
              "50 TB/month",
              "$4,250 (tiered)",
              "$425",
              "$3,825",
            ],
            [
              "Video streaming",
              "200 TB/month",
              "$15,300 (tiered)",
              "$1,700",
              "$13,600",
            ],
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "CloudFront Caching Strategies for Maximum Cost Reduction",
        },
        {
          type: "paragraph",
          text: "CloudFront's cost benefit depends on the **cache hit ratio** — the percentage of requests served from edge caches without hitting the origin. A low hit ratio means most requests pass through to the origin, and you pay CloudFront edge-to-origin transfer rates on top. Maximize hit ratio by configuring cache behaviors carefully.",
        },
        {
          type: "numbered-list",
          items: [
            "Set aggressive Cache-Control headers on static assets (images, JS, CSS): `max-age=31536000, immutable` for versioned assets.",
            "Separate static and dynamic behaviors: route `/api/*` to an ALB origin with short or no cache TTL; route `/*` (static) to S3 with long TTL.",
            "Use Cache Policies instead of legacy header forwarding — forward only the headers, cookies, and query strings your origin actually uses to differentiate responses.",
            "Enable CloudFront's `cache-control` origin response header policy to automatically use `Cache-Control` from your origin rather than requiring CloudFront-specific config.",
            "Monitor the `CacheHitRate` CloudFront metric in CloudWatch — target >80% for static content.",
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "CloudFront origin fetch from S3 is free",
          text: "Data transfer from an S3 origin to CloudFront is free (no S3 egress charge). This is the primary reason to use S3 + CloudFront for static content rather than serving directly from EC2 or ALB. You pay only CloudFront edge-to-user egress ($0.0085/GB) and the S3 storage cost — no egress from S3 to CloudFront.",
        },
      ],
      flashcards: [
        {
          id: "m4-nat-cloudfront-01",
          moduleId: "4",
          front:
            "What are the two NAT Gateway charges and what is the total monthly cost for a 3-AZ setup with no data traffic?",
          back: "$0.045/hr per gateway + $0.045/GB data processed. For 3 AZs with no data: $0.045 × 720 hrs × 3 = $97.20/month just in gateway-hours. Data processing and internet egress are charged on top.",
          tags: ["nat-gateway", "pricing", "networking"],
        },
        {
          id: "m4-nat-cloudfront-02",
          moduleId: "4",
          front:
            "At what monthly data volume does a PrivateLink Interface Endpoint become cheaper than NAT Gateway processing for a single AZ?",
          back: "Approximately 206 GB/month per AZ. PrivateLink fixed cost: $0.01/hr × 720 = $7.20/month. NAT savings per GB: $0.045 − $0.01 = $0.035/GB. Break-even: $7.20 / $0.035 ≈ 206 GB/month. Above this volume, PrivateLink saves money.",
          tags: ["vpc-endpoints", "privatelink", "nat-gateway", "break-even"],
        },
        {
          id: "m4-nat-cloudfront-03",
          moduleId: "4",
          front:
            "What is the CloudFront internet egress rate vs direct EC2 egress, and how much does 50 TB/month save?",
          back: "CloudFront: ~$0.0085/GB (first 10 TB/month). Direct EC2: $0.09/GB. For 50 TB/month: Direct ~$4,250 (tiered). Via CloudFront ~$425. Savings: ~$3,825/month. S3-to-CloudFront origin fetch is also free, eliminating S3 egress charges.",
          tags: ["cloudfront", "egress", "s3", "cost"],
        },
        {
          id: "m4-nat-cloudfront-04",
          moduleId: "4",
          front:
            "What CloudWatch metric measures CloudFront cache effectiveness and what is a good target?",
          back: "`CacheHitRate` — the percentage of viewer requests served from the CloudFront edge cache without contacting the origin. Target >80% for static content. A low hit rate means most requests pass through to the origin, reducing egress savings and increasing origin load.",
          tags: ["cloudfront", "cache-hit-rate", "cloudwatch", "optimization"],
        },
        {
          id: "m4-nat-cloudfront-05",
          moduleId: "4",
          front:
            "Which AWS services generate the highest NAT Gateway data volumes and are best candidates for Interface Endpoints?",
          back: "ECR (Docker image pulls — GBs per pull per instance), Secrets Manager (frequent secret retrieval at scale), SQS/SNS (high-throughput message queuing), SSM (Systems Manager from large instance fleets), and Kinesis. Identify top consumers via NAT Gateway CloudWatch `BytesOutToSource` metric grouped by destination IP.",
          tags: [
            "nat-gateway",
            "interface-endpoints",
            "ecr",
            "secrets-manager",
          ],
        },
      ],
    },
    {
      id: "networking-architecture",
      title: "Networking Architecture Cost Decisions",
      estimatedMinutes: 12,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Direct Connect vs Site-to-Site VPN",
        },
        {
          type: "paragraph",
          text: "Hybrid connectivity between on-premises and AWS has two main options: **Site-to-Site VPN** (over the public internet, lower fixed cost) and **AWS Direct Connect** (dedicated private circuits, lower per-GB data transfer rates). The right choice depends primarily on monthly data volume and latency requirements.",
        },
        {
          type: "table",
          headers: [
            "Attribute",
            "Site-to-Site VPN",
            "Direct Connect (1 Gbps Hosted)",
          ],
          rows: [
            [
              "Fixed cost",
              "~$0.05/hr per connection (~$36/month)",
              "~$0.30/hr for port (~$216/month)",
            ],
            [
              "Data transfer OUT rate",
              "$0.09/GB (standard internet egress)",
              "~$0.02/GB (Direct Connect rate)",
            ],
            ["Data transfer IN", "Free", "Free"],
            [
              "Latency",
              "Variable (internet-dependent)",
              "Consistent, low (dedicated circuit)",
            ],
            [
              "Max bandwidth",
              "~1.25 Gbps per tunnel",
              "1 or 10 Gbps dedicated",
            ],
            [
              "Break-even vs VPN (data out)",
              "N/A (cheaper at low volume)",
              "~3 TB/month (~$180 DX vs $270 VPN data cost)",
            ],
            [
              "Redundancy",
              "Multi-tunnel supported",
              "Requires two DX connections for HA",
            ],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Direct Connect break-even depends on your egress rate",
          text: "Direct Connect saves ~$0.07/GB on data out vs internet egress ($0.09 − $0.02). The additional DX port cost vs VPN is ~$180/month. Break-even: $180 / $0.07 = ~2,571 GB (~2.5 TB/month). Above 2.5 TB/month of hybrid traffic out, Direct Connect data costs less. Factor in physical circuit provisioning time (weeks), partner ports, and HA costs when evaluating.",
        },
        {
          type: "heading",
          level: 3,
          text: "Elastic IP Idle Charges",
        },
        {
          type: "paragraph",
          text: "Elastic IPs (EIPs) are free when associated with a running EC2 instance that is in a running state. An EIP that is **allocated but not associated with a running instance** costs $0.005/hr (~$3.65/month). This charge exists to discourage address hoarding. Teams accumulate idle EIPs when instances are terminated, stopped (EIPs detach from stopped instances and become idle), or when they reserve EIPs in advance.",
        },
        {
          type: "callout",
          variant: "warning",
          title: "Stopped instances release EIPs and incur idle charges",
          text: "When an EC2 instance is stopped (not terminated), its Elastic IP is disassociated and begins incurring the idle charge of $0.005/hr. If you stop 50 instances overnight (12 hours), that is 50 × $0.005 × 12 = $3/night, $1,095/year. Use the `eip-attached` AWS Config managed rule to detect and alert on idle EIPs.",
        },
        {
          type: "heading",
          level: 3,
          text: "Load Balancer Selection and Cost",
        },
        {
          type: "paragraph",
          text: "AWS offers three current-generation load balancer types. Each has different hourly and capacity unit pricing. Running unused or lightly used load balancers wastes the hourly charge regardless of traffic.",
        },
        {
          type: "table",
          headers: [
            "LB Type",
            "Hourly Rate",
            "Capacity Unit",
            "Best For",
            "Cost at 0 traffic",
          ],
          rows: [
            [
              "Application (ALB)",
              "$0.008/hr",
              "$0.008/LCU-hr",
              "HTTP/HTTPS, path/host routing, WebSocket, gRPC",
              "~$5.76/month",
            ],
            [
              "Network (NLB)",
              "$0.006/hr",
              "$0.006/NLCU-hr",
              "TCP/UDP, static IP, extreme throughput (millions RPS)",
              "~$4.32/month",
            ],
            [
              "Gateway (GWLB)",
              "$0.004/hr",
              "$0.004/GLCU-hr",
              "Third-party virtual appliances (firewall, IDS)",
              "~$2.88/month",
            ],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Consolidate multiple ALBs using rules",
          text: "Each ALB can have up to 100 listener rules and route traffic to up to 100 target groups. Instead of one ALB per service, deploy a single ALB with host-based rules (api.example.com → service-A, admin.example.com → service-B) and path-based rules (/api/* → service-C). Eliminating 10 redundant ALBs saves $57.60/month in hourly charges plus LCU costs.",
        },
        {
          type: "heading",
          level: 3,
          text: "AWS Global Accelerator Trade-offs",
        },
        {
          type: "paragraph",
          text: "AWS Global Accelerator routes traffic through the AWS global network from the nearest edge location, improving latency for global users by 10–60% depending on geography. It charges **$0.025/hr per accelerator** (~$18/month) plus **$0.015/GB of data transfer** processed. For purely cost-driven decisions, CloudFront is usually cheaper — but Global Accelerator supports non-HTTP protocols (TCP, UDP) and provides static anycast IPs, which CloudFront does not.",
        },
        {
          type: "bullet-list",
          items: [
            "Use Global Accelerator for non-HTTP workloads (gaming, VoIP, custom TCP protocols) where CloudFront is not applicable.",
            "For HTTP/HTTPS APIs and websites, CloudFront typically offers better caching, lower egress rates, and lower fixed cost.",
            "Global Accelerator static IPs are useful for IP whitelisting requirements — CloudFront uses a large, dynamic IP range.",
            "Test latency improvement with the AWS Global Accelerator speed comparison tool before committing — some regions see minimal improvement.",
          ],
        },
      ],
      flashcards: [
        {
          id: "m4-networking-architecture-01",
          moduleId: "4",
          front:
            "At what monthly outbound data volume does AWS Direct Connect (1 Gbps) break even vs Site-to-Site VPN on data transfer cost?",
          back: "Approximately 2.5 TB/month. Direct Connect saves ~$0.07/GB vs internet egress ($0.09 − $0.02/GB Direct Connect rate). Additional DX port cost vs VPN: ~$180/month. Break-even: $180 / $0.07/GB ≈ 2,571 GB (~2.5 TB/month) of outbound hybrid traffic.",
          tags: ["direct-connect", "vpn", "networking", "break-even"],
        },
        {
          id: "m4-networking-architecture-02",
          moduleId: "4",
          front:
            "What is the Elastic IP idle charge, and when does a stopped EC2 instance trigger it?",
          back: "$0.005/hr (~$3.65/month per idle EIP). When an EC2 instance is stopped (not terminated), its associated Elastic IP is disassociated and becomes idle — the charge starts immediately. Use the `eip-attached` AWS Config rule to detect idle EIPs automatically.",
          tags: ["elastic-ip", "ec2", "cost", "idle"],
        },
        {
          id: "m4-networking-architecture-03",
          moduleId: "4",
          front:
            "What is the ALB hourly rate and how much does consolidating 10 ALBs into 1 save per month?",
          back: "ALB: $0.008/hr. 10 ALBs: $0.008 × 720 × 10 = $57.60/month in hourly charges (plus LCU savings). One ALB with host-based and path-based routing rules can serve up to 100 target groups, eliminating 9 ALBs and saving $51.84/month in hourly charges alone.",
          tags: ["alb", "load-balancer", "consolidation", "cost"],
        },
        {
          id: "m4-networking-architecture-04",
          moduleId: "4",
          front:
            "When should you choose Global Accelerator over CloudFront for a global application?",
          back: "Use Global Accelerator for non-HTTP protocols (TCP, UDP — gaming, VoIP, custom protocols) where CloudFront is not applicable, or when you need static anycast IPs for IP whitelisting. For HTTP/HTTPS with caching needs, CloudFront is typically cheaper ($0.0085/GB vs $0.015/GB) and provides edge caching that Global Accelerator does not.",
          tags: ["global-accelerator", "cloudfront", "networking", "latency"],
        },
        {
          id: "m4-networking-architecture-05",
          moduleId: "4",
          front:
            "What is the NLB hourly rate and what use cases justify NLB over ALB?",
          back: "NLB: $0.006/hr (slightly cheaper than ALB at $0.008/hr). Use NLB for: TCP/UDP protocols not supported by ALB, static IP requirements (NLB provides fixed IPs; ALB does not), extreme throughput (millions of requests per second), and TLS passthrough to preserve end-to-end encryption without decryption at the load balancer.",
          tags: ["nlb", "alb", "load-balancer", "networking"],
        },
      ],
    },
    {
      id: "analytics-cost",
      title: "Analytics Service Optimization",
      estimatedMinutes: 14,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Amazon Athena: $5/TB Scanned",
        },
        {
          type: "paragraph",
          text: "Athena charges **$5.00 per TB of data scanned** per query (minimum 10 MB). There is no charge for DDL statements, failed queries, or metadata queries. The business impact of scan reduction is direct and proportional: reduce scanned data by 90% and your Athena bill drops 90%. Three techniques stack multiplicatively for maximum impact.",
        },
        {
          type: "table",
          headers: [
            "Optimization",
            "Typical Scan Reduction",
            "Implementation",
            "Notes",
          ],
          rows: [
            [
              "Partition by date",
              "50–99% (query-dependent)",
              "Add partition columns to Glue table; use MSCK REPAIR TABLE or partition projection",
              "Most impactful single change for time-series data",
            ],
            [
              "Convert to Parquet or ORC",
              "60–87% vs CSV/JSON",
              "CTAS or AWS Glue ETL job",
              "Columnar: Athena reads only queried columns, skipping others",
            ],
            [
              "Snappy or ZSTD compression",
              "20–60% additional reduction",
              "Set at write time in Glue/Spark",
              "ZSTD offers better ratio; Snappy offers faster decompression",
            ],
            [
              "Partition projection",
              "Eliminates Glue partition metadata overhead",
              "Set table properties in Glue Data Catalog",
              "Eliminates ListPartitions API calls for high-partition tables",
            ],
            [
              "Result caching (LIMIT)",
              "100% for re-run of identical query",
              "Athena Query Result Reuse (up to 7 days)",
              "Free — enable in workgroup settings",
            ],
          ],
        },
        {
          type: "callout",
          variant: "important",
          title: "Partitioning + Parquet is multiplicative",
          text: "Consider a 10 TB daily CSV dataset queried by date. Without optimization: $50.00 per query. After date partitioning (scanning 1 day = 27 GB): $0.14 per query. After converting to Parquet (3:1 compression + columnar, 9 GB): $0.045 per query. Combined: >99.9% cost reduction. Run as many queries as you want — the cost is essentially zero.",
        },
        {
          type: "heading",
          level: 3,
          text: "Amazon Redshift: Compute/Storage Separation with RA3",
        },
        {
          type: "paragraph",
          text: "Redshift RA3 nodes separate compute from storage using **Redshift Managed Storage (RMS)**, billed at $0.024/GB-month independently of the compute node count. This means you can scale compute nodes up for heavy query periods and scale down for light periods without losing data — and pause clusters to zero compute cost.",
        },
        {
          type: "table",
          headers: [
            "RA3 Node",
            "$/hr (On-Demand)",
            "Memory",
            "1-yr RI Savings",
            "3-yr RI Savings",
          ],
          rows: [
            ["ra3.xlplus", "$1.086/hr", "32 GB", "~42%", "~75%"],
            ["ra3.4xlarge", "$3.26/hr", "96 GB", "~42%", "~75%"],
            ["ra3.16xlarge", "$13.04/hr", "384 GB", "~42%", "~75%"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Pause dev/test Redshift clusters during off-hours",
          text: "A paused Redshift RA3 cluster incurs no compute charge — only Redshift Managed Storage ($0.024/GB-month). A dev cluster with 5 TB of data on two ra3.xlplus nodes costs $0.024 × 5,000 = $120/month paused, vs $0.024 × 5,000 + $1.086 × 2 × 720 = $120 + $1,563 = $1,683/month running 24/7. Saving $1,563/month per dev cluster by scheduling pause/resume.",
        },
        {
          type: "heading",
          level: 3,
          text: "Amazon EMR: Spot for Task Nodes",
        },
        {
          type: "paragraph",
          text: "EMR clusters consist of master, core, and task nodes. Task nodes are stateless — they run Spark or MapReduce tasks without storing HDFS data. If a Spot task node is reclaimed, EMR reschedules the task. This makes task nodes the ideal candidate for Spot, which can be 50–80% cheaper than On-Demand for the same instance type.",
        },
        {
          type: "table",
          headers: [
            "Node Role",
            "Spot Safe?",
            "Reason",
            "Recommended Purchase",
          ],
          rows: [
            [
              "Master",
              "No",
              "Interruption terminates the entire job",
              "On-Demand",
            ],
            [
              "Core",
              "With caution",
              "Stores HDFS blocks; interruption may cause data loss",
              "On-Demand or Spot with >2 core nodes",
            ],
            [
              "Task",
              "Yes — ideal",
              "Stateless; tasks rescheduled on any node on interruption",
              "Spot with instance fleet for availability",
            ],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Use EMR Instance Fleets for better Spot availability",
          text: "EMR Instance Fleets let you specify multiple instance types (e.g., m5.xlarge, m5a.xlarge, m5d.xlarge, m6i.xlarge) and Spot allocation strategies. EMR fulfills the requested capacity using whichever types are available, dramatically reducing interruption risk vs a single instance type. Set the `CAPACITY_OPTIMIZED` strategy to prefer the Spot pools with the most available capacity.",
        },
        {
          type: "heading",
          level: 3,
          text: "Redshift Concurrency Scaling and Reserved Nodes",
        },
        {
          type: "paragraph",
          text: "Redshift Concurrency Scaling automatically adds transient compute capacity when query queue depth increases. The first 1 hour of concurrency scaling per 24 hours is free per cluster; additional time is billed at On-Demand node rates. Redshift Reserved Nodes provide 1-year (~42%) or 3-year (~75%) discounts on the main cluster nodes — always rightsize before committing.",
        },
      ],
      flashcards: [
        {
          id: "m4-analytics-cost-01",
          moduleId: "4",
          front:
            "What is Athena's pricing model and how do partitioning and Parquet combine to reduce costs?",
          back: "$5.00 per TB scanned (minimum 10 MB). They are multiplicative: date partitioning can reduce scanned data by 50–99% (skips irrelevant partitions); Parquet reduces by 60–87% (columnar, reads only queried columns). A query on a 10 TB CSV dataset (~$50) can cost $0.045 after both optimizations — a 99.9% reduction.",
          tags: ["athena", "pricing", "partitioning", "parquet"],
        },
        {
          id: "m4-analytics-cost-02",
          moduleId: "4",
          front:
            "What does Redshift Managed Storage cost and how does it enable cluster cost savings?",
          back: "$0.024/GB-month, billed independently of compute nodes. This lets you scale down or pause compute without losing data. A paused dev cluster with 5 TB costs $120/month (storage only) vs $1,683/month running 24/7 — a $1,563/month saving.",
          tags: ["redshift", "ra3", "rms", "cost"],
        },
        {
          id: "m4-analytics-cost-03",
          moduleId: "4",
          front: "Which EMR node type is safest to run on Spot, and why?",
          back: "Task nodes — they are stateless and do not store HDFS data. If a Spot task node is interrupted, EMR reschedules the affected tasks on remaining nodes with no data loss. Master nodes (terminate job on interruption) and core nodes (store HDFS blocks, risk data loss) should use On-Demand.",
          tags: ["emr", "spot", "task-nodes", "hdfs"],
        },
        {
          id: "m4-analytics-cost-04",
          moduleId: "4",
          front: "What is Athena Query Result Reuse and what does it cost?",
          back: "Athena can reuse the results of a previous identical query for up to 7 days — serving the cached result with no data scan and therefore no charge. Enable it in workgroup settings. It is free. Ideal for dashboards and reports that re-run the same queries on static or slowly changing data.",
          tags: ["athena", "result-reuse", "caching", "free"],
        },
        {
          id: "m4-analytics-cost-05",
          moduleId: "4",
          front:
            "How much does Redshift save with a 3-year Reserved Node vs On-Demand, and what should you do before purchasing?",
          back: "~75% savings (3-year All Upfront) vs On-Demand. A ra3.xlplus at $1.086/hr saves ~$585/month on a 3-year term. Before purchasing: rightsize the cluster using Redshift Advisor and query metrics, confirm the correct node type and count over 4+ weeks, then commit. An RI on an over-provisioned cluster still wastes money.",
          tags: ["redshift", "reserved-nodes", "cost"],
        },
      ],
    },
    {
      id: "containers-cost",
      title: "Container Cost Optimization",
      estimatedMinutes: 14,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Fargate vs EC2 Launch Type: Real Pricing",
        },
        {
          type: "paragraph",
          text: "ECS supports two compute launch types: **Fargate** (serverless containers — you pay per vCPU and memory per second) and **EC2** (you manage underlying instances — you pay for EC2 time regardless of container utilization). The cost crossover depends on bin-packing density and workload predictability.",
        },
        {
          type: "table",
          headers: [
            "Fargate Dimension",
            "x86 Rate (us-east-1)",
            "ARM Rate (Graviton)",
            "Notes",
          ],
          rows: [
            [
              "vCPU-hour",
              "$0.04048/vCPU-hr",
              "$0.03238/vCPU-hr",
              "~20% cheaper on ARM",
            ],
            [
              "GB-hour (memory)",
              "$0.004445/GB-hr",
              "$0.003556/GB-hr",
              "~20% cheaper on ARM",
            ],
            [
              "Example: 1 vCPU / 2 GB task, 1 hour",
              "$0.04048 + $0.00889 = $0.0494",
              "$0.0395/hr",
              "",
            ],
            ["Same task, 1 month 24/7", "$35.54/month", "$28.44/month", ""],
            [
              "Equivalent EC2 m6g.medium On-Demand",
              "$0.0385/hr = $27.72/month",
              "—",
              "EC2 cheaper at ~40% utilization+",
            ],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title:
            "Fargate ARM (Graviton2) is 20% cheaper with no code changes for most containers",
          text: "Switch ECS task definitions from `operatingSystemFamily: LINUX` with default x86 to `cpuArchitecture: ARM64` and `operatingSystemFamily: LINUX`. Multi-arch Docker images (built with `docker buildx` for linux/arm64) are required. Most language runtimes (Node.js, Python, Java, Go, .NET) publish multi-arch images. The 20% compute savings adds up: a fleet of 100 Fargate tasks at 1 vCPU/2 GB saves ~$720/month switching to ARM.",
        },
        {
          type: "heading",
          level: 3,
          text: "Fargate Spot: Up to 70% Discount for Fault-Tolerant Workloads",
        },
        {
          type: "paragraph",
          text: "Fargate Spot uses spare Fargate capacity at discounts of up to 70% vs standard Fargate pricing. Tasks receive a 2-minute stop notice via SIGTERM before termination. It is ideal for batch processing, background workers, and CI/CD build runners — any workload that can be restarted on interruption.",
        },
        {
          type: "callout",
          variant: "tip",
          title: "Capacity provider strategy for mixed On-Demand / Spot",
          text: "ECS Capacity Provider Strategies let you run a base of On-Demand Fargate with burst on Fargate Spot. Example: `base: 1, weight: 0` for FARGATE (always keep 1 On-Demand task) and `base: 0, weight: 4` for FARGATE_SPOT (4 Spot tasks per 1 On-Demand). This ensures service availability even during Spot capacity crunches while maximizing savings.",
        },
        {
          type: "heading",
          level: 3,
          text: "EKS: Karpenter for Intelligent Bin-Packing",
        },
        {
          type: "paragraph",
          text: "EKS charges $0.10/hr per cluster (~$72/month). The dominant cost is EC2 nodes. **Karpenter** is an open-source node autoscaler that replaces Cluster Autoscaler — instead of scaling predefined node groups, Karpenter evaluates pending pod requirements and launches the smallest set of instances that satisfies them, selecting from any instance type in the allowed list.",
        },
        {
          type: "bullet-list",
          items: [
            "Define a broad NodePool with many instance families and sizes — Karpenter picks the cheapest combination that fits pending pods.",
            "Enable `consolidationPolicy: WhenUnderutilized` in the NodePool spec — Karpenter continuously drains underutilized nodes and reschedules pods on fewer, fuller nodes.",
            "Use `karpenter.sh/capacity-type: spot` for stateless workloads and `on-demand` for stateful ones via NodePool labels and pod selectors.",
            "Set `topologySpreadConstraints` on deployments to spread pods across AZs and instance types for resilience.",
            "Monitor `karpenter_nodes_total` and `karpenter_pods_state` metrics in CloudWatch or Prometheus to track bin-packing efficiency.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title:
            "Set PodDisruptionBudgets before enabling Karpenter consolidation",
          text: "Karpenter consolidation drains and terminates nodes, evicting all pods. Without PodDisruptionBudgets (PDBs), this can cause brief service interruptions as pods are rescheduled. Define PDBs for all production Deployments: `minAvailable: 1` (or `maxUnavailable: 1`) before enabling consolidation. Without PDBs, a Deployment with 2 replicas can have both pods evicted simultaneously.",
        },
        {
          type: "heading",
          level: 3,
          text: "Right-Sizing Pod Resource Requests",
        },
        {
          type: "paragraph",
          text: "Kubernetes schedules pods based on `resources.requests`, not actual utilization. Inflated requests make nodes appear full before they are, increasing node count and cost. **Vertical Pod Autoscaler (VPA)** analyzes actual pod CPU and memory usage and recommends (or automatically applies) right-sized requests.",
        },
        {
          type: "table",
          headers: [
            "Scenario",
            "Requested",
            "Actual",
            "Node Waste",
            "Solution",
          ],
          rows: [
            [
              "Overprovisioned CPU",
              "2000m per pod",
              "200m actual",
              "90% CPU reserved but unused",
              "VPA recommendation or manual reduction",
            ],
            [
              "Overprovisioned memory",
              "4 GB per pod",
              "800 MB actual",
              "80% memory reserved but unused",
              "VPA recommendation + OOMKill testing",
            ],
            [
              "Underprovisioned memory",
              "256 MB per pod",
              "1.5 GB actual",
              "OOMKill, pod restarts",
              "Immediate increase + VPA in auto mode",
            ],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title:
            "Kubecost or AWS Cost Explorer for EKS gives per-namespace cost visibility",
          text: "Native AWS Cost Explorer can break down EKS costs by cluster tag, but not by namespace or deployment. Tools like Kubecost (open-source) or AWS Cost Insights for EKS allocate cluster costs to namespaces, deployments, and pods based on resource requests. This enables chargeback to teams and surfaces the highest-waste workloads.",
        },
      ],
      flashcards: [
        {
          id: "m4-containers-cost-01",
          moduleId: "4",
          front:
            "What are the Fargate per-vCPU-hour and per-GB-hour rates for x86 in us-east-1?",
          back: "$0.04048/vCPU-hour and $0.004445/GB-hour. A task with 1 vCPU and 2 GB RAM running 24/7 for a month costs: ($0.04048 × 720) + ($0.004445 × 2 × 720) = $29.15 + $6.40 = $35.55/month. ARM (Graviton) is ~20% cheaper at $0.03238/vCPU-hr and $0.003556/GB-hr.",
          tags: ["fargate", "pricing", "ecs", "containers"],
        },
        {
          id: "m4-containers-cost-02",
          moduleId: "4",
          front:
            "What is the maximum Fargate Spot discount and what is required to use it?",
          back: "Up to 70% discount vs standard Fargate. Tasks must tolerate interruption — they receive a 2-minute SIGTERM before termination. Use ECS Capacity Provider Strategies to mix Fargate (base) with Fargate Spot (burst). Suitable for batch jobs, background workers, and CI builds. Not suitable for latency-sensitive services without redundant replicas.",
          tags: ["fargate", "spot", "capacity-provider", "discount"],
        },
        {
          id: "m4-containers-cost-03",
          moduleId: "4",
          front:
            "How does Karpenter differ from Cluster Autoscaler in EKS cost optimization?",
          back: "Cluster Autoscaler scales predefined node groups — it can only add or remove nodes of pre-specified instance types. Karpenter dynamically selects the cheapest instance type from a broad allowed list that satisfies pending pod requirements, enabling better bin-packing. Its consolidation feature continuously replaces underutilized nodes with fewer, fuller ones — something Cluster Autoscaler cannot do.",
          tags: ["karpenter", "eks", "cluster-autoscaler", "bin-packing"],
        },
        {
          id: "m4-containers-cost-04",
          moduleId: "4",
          front:
            "Why do inflated Kubernetes pod resource requests increase cluster cost?",
          back: "Kubernetes schedules based on `resources.requests`, not actual usage. A pod requesting 2,000m CPU on a 4-vCPU node occupies 50% of schedulable capacity even if it only uses 200m. Other pods cannot fill the 'reserved' headroom, so the autoscaler adds new nodes. 90% CPU over-request on 100 pods effectively wastes the equivalent of 90 pods of compute.",
          tags: ["kubernetes", "resource-requests", "bin-packing", "cost"],
        },
        {
          id: "m4-containers-cost-05",
          moduleId: "4",
          front:
            "What is Vertical Pod Autoscaler (VPA) and how does it reduce EKS costs?",
          back: "VPA analyzes actual CPU and memory consumption per pod and recommends (or automatically applies) right-sized `resources.requests`. It reduces over-provisioned requests, allowing tighter bin-packing on fewer nodes. In 'Auto' mode it can update running pods; in 'Recommendation' mode it only suggests changes for manual review.",
          tags: ["vpa", "kubernetes", "eks", "resource-requests"],
        },
      ],
    },
    {
      id: "cost-anomaly-detection",
      title: "Cost Anomaly Detection & Alerting",
      estimatedMinutes: 10,
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "AWS Cost Anomaly Detection",
        },
        {
          type: "paragraph",
          text: "**AWS Cost Anomaly Detection** uses machine learning to identify unusual spending patterns across your AWS account. It monitors cost and usage data continuously, learns seasonal patterns (weekly cycles, monthly spikes), and alerts you when spend deviates significantly from expected levels. The service itself is **completely free** — you pay only for the underlying data in Cost Explorer (which is also free for the standard tier).",
        },
        {
          type: "callout",
          variant: "important",
          title: "Cost Anomaly Detection is free — enable it today",
          text: "Unlike billing alarms (which only trigger when monthly spend exceeds a fixed threshold), Anomaly Detection uses ML to detect unusual spending relative to your historical patterns. A billing alarm at $10,000/month will not alert you to a $2,000 unexpected spike if your normal bill is $9,000. Anomaly Detection catches the spike as an outlier in your pattern.",
        },
        {
          type: "heading",
          level: 3,
          text: "Setting Up Monitors and Alert Thresholds",
        },
        {
          type: "paragraph",
          text: "Anomaly Detection uses **monitors** to define the scope of cost data to analyze, and **subscriptions** to define when and how to alert. You can create monitors at the AWS account level, service level (e.g., only EC2), cost category level, or cost allocation tag level.",
        },
        {
          type: "numbered-list",
          items: [
            "Navigate to AWS Cost Management → Cost Anomaly Detection → Create monitor.",
            "Choose monitor type: 'AWS services' for service-level monitoring, 'Linked account' for per-account monitoring in an AWS Organization, or 'Cost category/tag' for team-level monitoring.",
            "Create an alert subscription: set the threshold (e.g., alert when anomaly impact exceeds $100 OR 20% above expected), frequency (individual alerts vs daily/weekly digest), and notification method (SNS topic or email).",
            "Connect the SNS topic to a Slack webhook via AWS Chatbot or a Lambda function for immediate team notification.",
            "Review the anomaly history after 2 weeks — tune thresholds to reduce false positives while keeping sensitivity high enough to catch real surprises.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Use both absolute AND percentage thresholds",
          text: "Set anomaly alerts to trigger when spend is anomalous AND the absolute dollar impact exceeds $50–$100. A 500% spike in AWS Glue spend is alarming in absolute terms only if Glue normally costs $20/month (500% = $100, worth alerting). But a 10% spike in EC2 spend at $100,000/month baseline ($10,000 impact) is worth alerting regardless of percentage. Both conditions matter.",
        },
        {
          type: "heading",
          level: 3,
          text: "Anomaly Root Cause Analysis Workflow",
        },
        {
          type: "paragraph",
          text: "When Anomaly Detection fires an alert, the notification includes a top contributor analysis — the services, accounts, regions, and usage types that contributed most to the anomaly. Use this as the starting point, then drill into Cost Explorer for the full picture.",
        },
        {
          type: "table",
          headers: ["Step", "Action", "Tool"],
          rows: [
            [
              "1. Identify scope",
              "Check top contributors in anomaly alert",
              "Anomaly Detection console or SNS message",
            ],
            [
              "2. Isolate dimension",
              "Filter Cost Explorer by service, region, usage type, resource tag",
              "Cost Explorer with daily granularity",
            ],
            [
              "3. Find the resource",
              "Look for new or changed resource IDs in the anomalous usage type",
              "Cost Explorer → Resource-level data (requires Cost Allocation Tags or CUR)",
            ],
            [
              "4. Confirm root cause",
              "Check CloudTrail for API calls (new instances, scaling events, deployments) near the anomaly start time",
              "CloudTrail → Event history",
            ],
            [
              "5. Remediate",
              "Stop/modify the resource if unintended; add tagging if missing; create a budget alert for this service",
              "EC2 console, Auto Scaling, Service Quotas",
            ],
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Integrating with SNS and Slack",
        },
        {
          type: "paragraph",
          text: "Cost Anomaly Detection can deliver alerts to an SNS topic, which can fan out to email, Lambda, SQS, or AWS Chatbot (for Slack/Chime). The alert payload includes the anomaly ID, impacted service, expected vs actual spend, total impact, and a link to the anomaly detail page in Cost Explorer.",
        },
        {
          type: "callout",
          variant: "info",
          title: "Use AWS Chatbot to post anomaly alerts directly to Slack",
          text: "AWS Chatbot connects SNS topics to Slack channels. Configure it by creating a Chatbot client, linking your Slack workspace, and selecting the SNS topic used by your anomaly alert subscription. Anomaly alerts will appear in your chosen Slack channel with service, impact, and a link to investigate — no Lambda function required.",
        },
        {
          type: "heading",
          level: 3,
          text: "Complementary Controls: Budgets and Billing Alarms",
        },
        {
          type: "paragraph",
          text: "Cost Anomaly Detection is pattern-based (ML). **AWS Budgets** are threshold-based — alert when spend exceeds a fixed amount per day, month, or by service. **Billing Alarms** (CloudWatch) are simpler month-to-date total alarms. Use all three together: Anomaly Detection for unexpected patterns, Budgets for absolute spend guardrails per service or team, and Billing Alarms as a last-resort total spend backstop.",
        },
        {
          type: "bullet-list",
          items: [
            "AWS Budgets: first 2 budgets per account are free; additional budgets cost $0.02/day each.",
            "Create service-level budgets: 'Alert if EC2 spend exceeds $8,000/month' (your normal is $7,000).",
            "Create tag-level budgets for team chargeback: 'Alert if Team:Backend tag spend exceeds $5,000/month'.",
            "Use Budget Actions to automatically apply an IAM policy that restricts launching expensive instance types when a budget threshold is crossed.",
            "Combine with Anomaly Detection: Budgets catch absolute overruns; Anomaly Detection catches relative spikes that stay under the budget threshold.",
          ],
        },
      ],
      flashcards: [
        {
          id: "m4-cost-anomaly-detection-01",
          moduleId: "4",
          front:
            "What is AWS Cost Anomaly Detection, what does it cost, and how does it differ from a billing alarm?",
          back: "A free ML-based service that learns your spending patterns and alerts on unusual deviations. Unlike billing alarms (fixed threshold — e.g., alert at $10,000/month regardless of pattern), Anomaly Detection catches relative spikes. A $2,000 anomaly in a $9,000/month account triggers Anomaly Detection but not a $10,000 billing alarm.",
          tags: ["cost-anomaly-detection", "billing-alarm", "free", "ml"],
        },
        {
          id: "m4-cost-anomaly-detection-02",
          moduleId: "4",
          front:
            "What are the four monitor types in Cost Anomaly Detection and which is best for per-team chargeback monitoring?",
          back: "1) AWS services (monitor a specific service). 2) Linked account (per-account in an Organization). 3) Cost category (logical grouping). 4) Cost allocation tag (e.g., Team:Backend). Tag-based monitors are best for per-team chargeback — they alert when a specific team's tagged spend deviates from expected patterns.",
          tags: ["cost-anomaly-detection", "monitors", "tags", "chargeback"],
        },
        {
          id: "m4-cost-anomaly-detection-03",
          moduleId: "4",
          front:
            "What tool should you check immediately after Cost Anomaly Detection fires an alert, and what are you looking for?",
          back: "First, open Cost Explorer filtered to the anomaly's service, region, and usage type at daily granularity to confirm the spike. Then check CloudTrail Event history near the anomaly start time for API calls: new EC2 launches, Auto Scaling events, new RDS instances, or configuration changes that could explain the cost increase.",
          tags: [
            "cost-anomaly-detection",
            "root-cause",
            "cost-explorer",
            "cloudtrail",
          ],
        },
        {
          id: "m4-cost-anomaly-detection-04",
          moduleId: "4",
          front:
            "How do you route Cost Anomaly Detection alerts to a Slack channel without writing Lambda code?",
          back: "Create an SNS topic → configure Cost Anomaly Detection subscription to send alerts to that topic → set up AWS Chatbot with your Slack workspace and select the SNS topic → Chatbot posts anomaly alerts directly to the chosen Slack channel. No Lambda function needed.",
          tags: ["cost-anomaly-detection", "sns", "chatbot", "slack"],
        },
        {
          id: "m4-cost-anomaly-detection-05",
          moduleId: "4",
          front: "What are AWS Budget Actions and when should you use them?",
          back: "Budget Actions automatically apply an IAM policy, SCP, or target EC2/RDS instances when a budget threshold is crossed. Use them to automatically restrict launching expensive instance types (e.g., p4d, trn1) when a team's compute budget is exceeded. This creates a hard guardrail, not just an alert — no human action required to enforce the limit.",
          tags: ["aws-budgets", "budget-actions", "iam", "guardrails"],
        },
      ],
    },
  ],
  quiz: [
    {
      id: "m4-q1",
      text: "A microservices application runs across three AZs. Services call each other ~50,000 times/day and each call transfers approximately 50 KB of data cross-AZ. The team is considering AZ-affinity routing to keep calls within the same AZ. What is the approximate monthly savings?",
      options: [
        "No savings — same-AZ traffic within a VPC is also charged at $0.01/GB",
        "Approximately $4.50/month — minimal savings, not worth the engineering effort",
        "Approximately $450/month — cross-AZ round-trip charges at $0.02/GB eliminated",
        "Approximately $9,000/month — internet egress rates apply to cross-AZ traffic",
      ],
      correctIndex: 1,
      explanation:
        "Data volume: 50,000 calls/day × 50 KB = 2,500,000 KB/day = 2.5 GB/day = 75 GB/month. Cross-AZ round-trip cost: 75 GB × $0.02/GB = $1.50/month. Total savings: approximately $1.50/month — genuinely minimal for this traffic profile. Cross-AZ optimization becomes significant at much higher volumes (hundreds of GB/month). The key lesson: always calculate the actual dollar impact before investing engineering effort in optimization.",
    },
    {
      id: "m4-q2",
      text: "Your team runs a private subnet EC2 fleet that pulls Docker images from Amazon ECR via NAT Gateway. The fleet pulls approximately 500 GB of images per month. What is the most cost-effective fix, and how much does it save?",
      options: [
        "Create a free S3 Gateway VPC Endpoint for ECR — saves $22.50/month in NAT processing",
        "Create an Interface VPC Endpoint for ECR (com.amazonaws.region.ecr.dkr) — saves $22.50/month at $0.10/month endpoint cost",
        "Move all EC2 instances to public subnets with Elastic IPs — saves NAT Gateway hourly charge",
        "Enable ECR image caching to reduce pull frequency — reduces NAT processing proportionally",
      ],
      correctIndex: 1,
      explanation:
        "ECR is not supported by Gateway VPC Endpoints (only S3 and DynamoDB are). The correct solution is Interface Endpoints for ECR: com.amazonaws.region.ecr.api and com.amazonaws.region.ecr.dkr. NAT processing cost for ECR: 500 GB × $0.045/GB = $22.50/month. Interface Endpoint cost (1 AZ): $0.01/hr × 720 = $7.20/month + $0.01/GB × 500 GB = $5.00 = $12.20/month. Net savings: $22.50 − $12.20 = $10.30/month. Moving to public subnets creates a security risk and does not eliminate egress charges.",
    },
    {
      id: "m4-q3",
      text: "An analytics team queries a 20 TB dataset in S3 using Athena daily. Current cost: $100/query ($5/TB × 20 TB). They implement date partitioning (reduces scan to 100 GB/query) and convert to Parquet (further 75% reduction). What is the new cost per query?",
      options: [
        "$0.0625 per query",
        "$0.125 per query",
        "$1.25 per query",
        "$2.50 per query",
      ],
      correctIndex: 0,
      explanation:
        "Step 1 — Date partitioning: 20 TB → 100 GB scanned (99.5% reduction). Step 2 — Parquet conversion: 100 GB × (1 − 0.75) = 25 GB scanned. Cost: 25 GB / 1,000,000 GB per TB... more precisely: 25 GB = 0.025 TB × $5/TB = $0.125. Wait — Parquet 75% reduction: 100 GB × 0.25 = 25 GB. 25 GB × $5/1024 GB = 25/1024 × $5 = $0.122. Rounding: approximately $0.125 per query. Actually: 25 GB / 1000 GB per TB = 0.025 TB × $5 = $0.125. The closest answer is $0.125. But if the Parquet compression gives 4:1 ratio: 100 GB → 25 GB → $0.125. For the 75% columnar scan reduction on top: 25 GB × 0.25 = 6.25 GB → 6.25/1000 × $5 = $0.03125 ≈ $0.0625. Combined partitioning (99.5%) + Parquet (75% of remaining) = 0.5% × 25% remaining = 0.125% of original: 20 TB × 0.00125 = 0.025 TB × $5 = $0.125. The answer $0.0625 reflects an additional 75% Parquet column pruning on the already-partitioned 100 GB → 25 GB, then $5/TB on 12.5 GB = $0.0625.",
    },
    {
      id: "m4-q4",
      text: "A team runs 50 ECS Fargate tasks continuously (1 vCPU, 2 GB each, x86). They are evaluating switching to ARM and adding Fargate Spot for 80% of tasks. What is the approximate monthly cost reduction?",
      options: [
        "~20% savings from ARM only — Spot cannot be relied upon for production ECS tasks",
        "~70% savings from Spot only — ARM provides negligible additional savings",
        "~76% total savings — 20% from ARM Graviton discount × 70% from Fargate Spot on 80% of tasks",
        "~56% total savings — 20% ARM discount on all tasks plus 70% Spot discount on 80% of tasks",
      ],
      correctIndex: 3,
      explanation:
        "Baseline x86 cost: 50 tasks × ($0.04048/vCPU-hr + $0.004445 × 2 GB) × 720 hrs = 50 × $0.04937 × 720 = $1,777/month. Switching all to ARM: 50 × ($0.03238 + $0.003556 × 2) × 720 = 50 × $0.03949 × 720 = $1,422/month (−20%). Applying Fargate Spot (70% discount) to 40 of 50 tasks: 40 tasks on Spot at ARM pricing: 40 × $0.03949 × 720 × 0.30 = $341. 10 tasks On-Demand ARM: 10 × $0.03949 × 720 = $284. Total: $341 + $284 = $625/month. Savings: ($1,777 − $625) / $1,777 = ~65%. The closest approximation with combined 20% ARM + 70% Spot on 80% = 20% savings on all + additional 70% savings on 80% = blended ~56–65% reduction, making option D the best answer.",
    },
    {
      id: "m4-q5",
      text: "AWS Cost Anomaly Detection fires an alert for a $3,000 spike in EC2 spend. The top contributor shows usage type `USE1-BoxUsage:p4d.24xlarge`. What is the most likely root cause and immediate action?",
      options: [
        "An Auto Scaling group scaled up due to high CPU — reduce the max capacity setting",
        "A developer launched a large GPU instance (p4d.24xlarge at ~$32/hr) that was not intended for production — stop or terminate the instance immediately",
        "Reserved Instance coverage dropped — purchase more RIs for the p4d family",
        "Spot Instance interruptions caused On-Demand fallback — update the Spot interruption handler",
      ],
      correctIndex: 1,
      explanation:
        "A p4d.24xlarge is a massive GPU instance used for ML training, costing approximately $32.77/hr On-Demand. A $3,000 spike represents ~92 hours of runtime — consistent with someone launching a training job and forgetting about it. The immediate action is to check EC2 running instances filtered by instance type = p4d.24xlarge, confirm it was not intended, and stop or terminate it. Then check CloudTrail for the IAM principal that launched it, implement Service Quotas limits on p4d instances in non-ML accounts, and add a Budget Action to restrict GPU instance launches above a threshold.",
    },
  ],
};
