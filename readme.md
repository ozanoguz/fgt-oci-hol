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

Click link below using same browser you used to login OCI. Link below will be redirecting to Oracle Stacks service, the service using Terraform behind the scenes. 

|Create Lab Environment|
|:-:|
|[![Deploy to Oracle Cloud](https://oci-resourcemanager-plugin.plugins.oci.oraclecloud.com/latest/deploy-to-oracle-cloud.svg)](https://cloud.oracle.com/resourcemanager/stacks/create?zipUrl=https://github.com/ozanoguz/fgt-oci-hol/releases/download/hol/FGT_A-P_NewVCN_v7.0.12_BYOL.zip)|

Template above is creating following infrastructure:

* 3x VCNs (2x Spoke VCNs and a FortiGate VCN)
* Required subnets, route tables and security lists
* 2x FortiGate-VM08 using FortiOS v7.0.12 BYOL image

In "Stacks" management page, check the *I have reviewed and accept the Oracle Terms of Use* box. 

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/05.stacks_01.jpg width="400"/>

Make sure specific student compartment has been selected. then click **_Next_** at bottom left.

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/08.stacks_04.jpg width="200"/>

On next page, you should define a _**PREFIX**_ for your deployment. Each group will use a different student-id and compartment, so we can easily find specific resources per study group. **This step is mandatory**. After this, you can click _**Next**_ on below left and then _**Create**_.

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/06.stacks_02.jpg width="150"/>

It will take couple of minutes for deployment to be completed. It will be shown as *SUCCEEDED* after completion.

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/07.stacks_03.jpg width="100"/>

### Step 2.2: Verify if deployment is successful.

FortiGate-VMs should be deployed and visible under _**Compute > Instances **_

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/09.verify01.jpg width="500"/>

There will be 3x VCNs deployed for lab as below:

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/10.verify02.jpg width="500"/>


