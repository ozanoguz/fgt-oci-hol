# FortiGate A/P HA Cluster in OCI Hands-on-Lab

**!!! DISCLAIMER: THIS REPO IS PREPARED ONLY FOR FORTINET XPERTS SUMMIT KSA '23 SESSION !!!**

This step-by-step guide describes how to deploy FortiGate Active/Passive cluster on OCI (Oracle Cloud Infrastructure) platform using Terraform to protect workloads for N/S and E/W traffic using native networking components e.g. DRG. This hands-on-lab consists on following steps:

-	[Section 1: Login OCI and prepare for deployment](https://github.com/ozanoguz/fgt-sdn-connector-eks-egress/blob/main/README.md#section-1-creating-aws-eks-cluster-using-bash-script)
- [Section 2: Deploy A/P FortiGate cluster](https://github.com/ozanoguz/fgt-sdn-connector-eks-egress/blob/main/README.md#section-2-deploying-fortigate-single-vm-instance-using-aws-marketplace)
-	[Section 3: Deploy Spoke-VMs for testing](https://github.com/ozanoguz/fgt-sdn-connector-eks-egress/blob/main/README.md#section-3-preparing-eks-cluster--deploy-simple-application)
-	[Section 4: Fine-tune OCI routing](https://github.com/ozanoguz/fgt-sdn-connector-eks-egress/blob/main/README.md#section-4-connecting-fortigate-to-eks)
-	[Section 5: Configure FortiGate routing and firewall policy](https://github.com/ozanoguz/fgt-sdn-connector-eks-egress/blob/main/README.md#section-5-southnorth-egress-traffic-inspection-through-fortigate)
-	[Section 6: Testing the deployment](https://github.com/ozanoguz/fgt-sdn-connector-eks-egress/blob/main/README.md#section-6-optional-automation-by-scaling-up-nginx-deployment)
-	[Section 7: Destroy the lab](https://github.com/ozanoguz/fgt-sdn-connector-eks-egress/blob/main/README.md#section-7-destroy-the-lab)

