---
title: Cloud Infrastructure & Recovery (AWS, SAP.IO, Zynga)
tags: ['AWS', 'Lambda Functions', 'Cloudfront', 'EBS']
sortOrder: 18
---

AWS infrastructure work across SAP.IO and Zynga.

- Reduced Kubernetes cluster costs by 60% via kops downscaling at SAP.IO
- Planned Memcached-to-ElastiCache migration for volatile keys at Zynga
- Wrote Python Lambda functions for automatic bad-node replacement
- Restored critical EBS snapshots of accidentally deleted volumes under high pressure
- Built AWS SES email templates and Workmail integrations for side projects
