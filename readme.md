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

Here is the topology diagram showing all components that will be deployed:

## Section 1: Login OCI and prepare for deployment

### Step 1.1: Access OCI console

First, let's login OCI console using link below. Username/password details will be provided during lab session. 

[Access OCI  Console](https://cloud.oracle.com)

Use "*fortinetoraclecloud1*" as cloud account name, click *Next*.

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/01.login_oci_1.jpg width="300"/>

Click down arrow on below right and login using username/password pair.

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/02.login_oci_2.jpg width="300"/> <img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/03.login_oci_3.jpg width="300"/>

### Step 1.2: Change Oracle region

Change the Oracle region to "Saudi Arabia West (Jeddah) on top right using dropdown menu :

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/04.login_oci_4.jpg width="200"/>

## Section 2: Deploy A/P FortiGate cluster

### Step 2.1: Deploy FortiGate cluster using Terraform

Click link below which is redirecting to Oracle Stacks service, the service using Terraform behind the scenes. 

[Create Lab Environment](https://cloud.oracle.com)

Template above is creating following infrastructure:

* 3x VCNs (2x Spoke VCNs and a FortiGate VCN)
* Required subnets, route tables and security lists
