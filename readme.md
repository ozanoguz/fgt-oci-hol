# FortiGate A/P HA Cluster in OCI Hands-on-Lab

**!!! DISCLAIMER: THIS REPO IS PREPARED ONLY FOR FORTINET XPERTS SUMMIT KSA '23 SESSION !!!**

This step-by-step guide describes how to deploy FortiGate Active/Passive cluster on OCI (Oracle Cloud Infrastructure) platform using Terraform to protect workloads for N/S and E/W traffic using native networking components e.g. DRG. This hands-on-lab consists on following steps:

-	[Section 1: Login OCI and prepare for deployment](https://github.com/ozanoguz/fgt-oci-hol/tree/main#section-1-login-oci-and-prepare-for-deployment)
- [Section 2: Deploy A/P FortiGate cluster](https://github.com/ozanoguz/fgt-oci-hol/tree/main#section-2-deploy-ap-fortigate-cluster)
-	[Section 3: Deploy Spoke-VMs for testing](https://github.com/ozanoguz/fgt-oci-hol/tree/main#section-3-deploy-spoke-vms-for-testing)
-	[Section 4: OCI advanced routing](https://github.com/ozanoguz/fgt-oci-hol/tree/main#section-4-oci-advanced-routing)
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

### Step 2.2: Verify deployment

FortiGate-VMs should be deployed and shown as *running* under _**Compute > Instances **_

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/09.verify01.jpg width="500"/>

There will be 3x VCNs deployed for lab as below:

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/10.verify02.jpg width="500"/>

## Section 3: Deploy Spoke-VMs for testing

### Step 3.1: Create Ubuntu instance

Click _**Create**_ on _**Compute > Instances**_

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/11.spokevm01.jpg width="400"/>

Give a name to spoke-VM using group Student-ID# (example: Student25-Spoke1-VM)

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/12.spokevm02.jpg width="200"/>

Under "Image and shape" section select _Canonical Ubuntu 22.04" image for Spoke1-VMs.

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/13.spokevm03.jpg width="500"/> <img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/14.spokevm04.jpg width="500"/>

Under "Primary VNIC Configuration" section, select related VCN and subnets as follows:

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/15.spokevm05.jpg width="400"/>

Under "Add SSH keys" section, download private key that we'll use later to login spoke-VMs.

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/16.spokevm06.jpg width="400"/>

Click "Create" to deploy Spoke1-VM.

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/17.spokevm07.jpg width="200"/>

**Repeat steps 3.1 for Spoke2-VM to deploy another Ubuntu-VM in Spoke2 VCN.**

Before proceeding, make sure all VMs are in running state.

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/20.spokevm07_1.jpg width="200"/>

## Section 4: OCI advanced routing

### Step 4.1: Create DRG

Type "dynamic routing gateway" to search box on top:

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/18.routing1.jpg width="400"/>

Make sure specific compartment has been selected, then select "Create dynamic routing gateway".

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/19.routing2.jpg width="300"/>

Set DRG name with your group student-ID as below. Make sure specific compartment has been selected.

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/21.routing3.jpg width="300"/>

### Step 4.2: DRG VCN attachments

We need to attach Spoke and FortiGate VCNs to DRG to enable communication. 

In DRG configuration screen, select "VCN attachments" on left.

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/22.routing4.jpg width="300"/>

Configure FortiGate-VCN attachment as below:

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/23.routing5.jpg width="300"/>

Configure Spoke1-VCN attachment as below:

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/24.routing6.jpg width="300"/>

Configure Spoke2-VCN attachment as below:

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/25.routing7.jpg width="300"/>

Verify that you have 3 successful attachments:

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/26.routing8.jpg width="400"/>

### Step 4.3: Spoke subnet routing (for E/W and S/N inspection)

Under _"Virtual cloud networks > Spoke1-VCN > Route tables"_, select **Student##-spoke1-routetable**

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/27.routing9.jpg width="300"/>

After clicking **Add Route rules**, add Spoke2-VCN CIDR route pointing to DRG attachment.

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/28.routing10.jpg width="300"/>

Edit 0.0.0.0/0 route to point DRG.

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/29.routing11.jpg width="300"/>

Both route rules should be showing DRG as target type. 

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/30.routing12.jpg width="400"/>

**Follow same steps (4.3) to configure for Spoke2-VCN route table.**

### Step 4.4: FortiGate Trust subnet routing

Configure route table **Student##-trust-routetable** as below. You can navigate there using path _"Networking > Virtual cloud networks > Student##-VCN > Route tables"_. This is for return traffic.

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/31.routing13.jpg width="400"/>



