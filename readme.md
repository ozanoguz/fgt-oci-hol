# FortiGate A/P HA Cluster in OCI Hands-on-Lab

**!!! DISCLAIMER: THIS REPO IS PREPARED ONLY FOR FORTINET XPERTS SUMMIT KSA '23 SESSION !!!**

This step-by-step guide describes how to deploy FortiGate Active/Passive cluster on OCI (Oracle Cloud Infrastructure) platform using Terraform to protect workloads for N/S and E/W traffic using native networking components e.g. DRG. This hands-on-lab consists on following steps:

-	[Section 1: Login OCI and prepare for deployment](https://github.com/ozanoguz/fgt-oci-hol/tree/main#section-1-login-oci-and-prepare-for-deployment)
- [Section 2: Deploy A/P FortiGate cluster](https://github.com/ozanoguz/fgt-oci-hol/tree/main#section-2-deploy-ap-fortigate-cluster)
-	[Section 3: Deploy Spoke-VMs for testing](https://github.com/ozanoguz/fgt-oci-hol/tree/main#section-3-deploy-spoke-vms-for-testing)
-	[Section 4: OCI advanced routing](https://github.com/ozanoguz/fgt-oci-hol/tree/main#section-4-oci-advanced-routing)
-	[Section 5: Configure FortiGate routing and firewall policy](https://github.com/ozanoguz/fgt-oci-hol/tree/main#section-5-configure-fortigate-routing-and-firewall-policy)
-	[Section 6: Testing the deployment](https://github.com/ozanoguz/fgt-oci-hol/tree/main#section-6-testing-the-deployment)
-	[Section 7: Destroy the lab](https://github.com/ozanoguz/fgt-oci-hol/tree/main#section-7-destroy-the-lab)

Here is the topology diagram showing all components that will be deployed:

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/KSA_Topology.jpg width="500"/>

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

On next page, you should define a _**PREFIX**_ and paste **specific compartment OCID value" for your deployment. Each group will use a different student-id and compartment, so we can easily find specific resources per study group. **This step is mandatory**. After this, you can click _**Next**_ on below left and then _**Create**_. **!!! IF THIS STEP IS NOT CONFIGURED CORRECTLY, DEPLOYMENT WILL FAIL !!!**

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/06.stacks_02a.jpg width="700"/>

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

Under "Primary VNIC Configuration" section, select related VCN and subnets as follows. **Remove "Automatically assign public IPV4 address" check, since we will not use it."**

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/15.spokevm05a.jpg width="400"/>

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

Edit 0.0.0.0/0 route to point DRG.

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/29.routing11.jpg width="300"/>

**Follow same step (4.3) to configure for Spoke2-VCN route table.**

### Step 4.4: FortiGate Trust subnet routing

Configure route table **Student##-trust-routetable** as below. You can navigate there using path _"Networking > Virtual cloud networks > Student##-VCN > Route tables"_. This is for return traffic.

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/31.routing13.jpg width="400"/>

### Step 4.5: DRG route tables

Create two separate route tables in DRG management screen as below. Navigation path: _Networking > Virtual cloud networks > Customer connectivity > Dynamic routing gateways > Student##-DRG >  DRG route tables > Create DRG route table_

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/32.routing14.jpg width="400"/>

Associate DRG route tables with VCN attachments. 

FortiGate VCN attachment should use _Student##-Hub-Route-Table_, Spoke VCN attachments should use _Student##-Spoke-Route-Table_. Navigation path: _Networking > Virtual cloud networks > Customer connectivity > Dynamic routing gateways >Student##-DRG > VCN attachments > Edit_

FortiGate Hub VCN attachment route-table configuration:

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/33.routing15.jpg width="300"/>

Spoke VCN attachment route-table configuration: (should be configured for both Spoke-VCN attachments)

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/34.routing16.jpg width="300"/>

VCN attachment route-table configuration should be like this:

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/35.routing17.jpg width="400"/>

### Step 4.6: Import route distributions

We need to create route distributions for DRG hub route tables, so required prefixes will be announced into route table for connectivity.

First, create an import route distribution for Hub DRG route table to allow spoke VCN CIDR's to be announced as below: (_Path: Networking > Customer connectivity > Dynamic routing gateways > Student##-DRG > Import route distributions > Create import route distribution_)

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/routing22a.jpg width="500"/>

Use import route distribution within DRG hub route table: (_Path: Networking > Customer connectivity > Dynamic routing gateways > Student##-DRG > DRG route tables > Edit_)

Hub DRG route table:

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/routing24a.jpg width="300"/>

Second, create another import route distribution for Spoke DRG route table to allow Hub VCN CIDR to be announced as below: (_Path: Networking > Customer connectivity > Dynamic routing gateways > Student##-DRG > Import route distributions > Create import route distribution_)

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/routing24b.jpg width="500"/>

Use import route distribution within DRG spoke route table: (_Path: Networking > Customer connectivity > Dynamic routing gateways > Student##-DRG > DRG route tables > Edit_)

Spoke DRG route table:

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/routing24c.jpg width="300"/>

### Step 4.7: Hub VCN Ingress Route Table

We need to configure FortiGate HA cluster floating IP as next-hop for handling routing by DRG. To achieve this, first let's create a route-table in FortiGate Hub VCN and use that route-table in Hub VCN DRG attachment ingress routing.

Create a route-table in FortiGate Hub VCN as below. You can give a name using your group student-ID. _Navigation Path: Networking > Virtual Cloud Networks > Student##-VCN > Route Tables > Create Route Table_

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/36.routing18.jpg width="400"/>

FortiGate A/P HA cluster floating IP can be found under FortiGate-VM vNIC configuration. We will use trust interface floating IP as private IP target.

You can find the floating IP using this path: _Instances > Student##-FortiGate-A > Attached VNICs > Trust-a interface > IPv4 addresses > Secondary IP (not primary)

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/38.routing20.jpg width="200"/>

Route rules are pointing FortiGate floating IP to reach out spoke VCN CIDRs and Internet. _Navigation Path: Networking > Virtual cloud networks > Student##-VCN > Route Tables > Student##-Ingress-Route-Table > Add Route Rules_

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/routing19a.jpg width="500"/>

Now, we will use this route-table in Hub VCN DRG attachment configuration. Path: _Networking > Customer connectivity > Dynamic routing gateways > Student##-DRG > VCN attachments > Edit Hub VCN attachment_

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/39.routing21.jpg width="400"/>

## Section 5: Configure FortiGate routing and firewall policy

### Step 5.1: Prepare FortiGate

SSH both cluster members using public IPs. **SSH login password is VM's OCID for the 1st time, which can be copied from OCI console.You can set any password you can remember.**

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/fgt01.jpg width="300"/>

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/fgt02.jpg width="500"/>

Because of the known cloud-init issue, we need to execute "execute factoryreset" before proceeding:

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/fgt04.jpg width="300"/>

_**Make sure Step 5.1 is applied on both cluster members.**_

### Step 5.2: FortiFlex license activation

Since we are using BYOL type of image, FortiGate-VM license should be activated.

You will need FortiFlex token for license activation. This will be shared during HoL session. CLI command is "execute vm-license <TOKEN-ID>". Type "y" for system to reboot and re-open with license activated. 

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/fgt03.jpg width="300"/>

Follow same steps for other FortiGate cluster member (FortiGate-B).

### Step 5.3: FortiGate GUI and static route

Login FortiGate management GUI using public IPs _(https://<FortiGate-Public-IP>)_

Click to "Later" on following screen:

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/fgt05.jpg width="400"/>

We need to add Spoke-VCN CIDR routes and set port2-subnet's first IP address as gateway IP. This is done for return traffic. (_Path: **Network > Static Routes**_)

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/fgt06.jpg width="400"/>

You should see both static routes on active FortiGate member as below:

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/fgt07.jpg width="400"/>

### Step 5.4: Ingress firewall policy

Create a VIP (Virtual IP Address) using Spoke-VM IPs. Following example is showing traffic coming from outside (North/South) to TCP/2244 will be mapped to Spoke1-VMs SSH port, meaning destination IP and port NAT will be handled by FortiGate. (_Path: **Policy & Objects > Virtual IPs  > Create New**_)

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/fgt08.jpg width="500"/>

Create another VIP for Spoke2-VM using TCP/2245.

Then, we will create a ingress firewall policy using objects above. You can set "Log Allowed Traffic" option to "All Sessions" for troubleshooting.

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/fgt09.jpg width="400"/>

### Step 5.5: Egress firewall policy

Create host objects on FortiGate for Spoke1-VM and Spoke2-VM. (_Path: **Policy & Objects > Addresses  > Create New**_)

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/fgt10.jpg width="300"/> <img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/fgt11.jpg width="300"/>

Using those objects, create an Egress Policy for allowing Internet access (South/North). You can set "Log Allowed Traffic" option to "All Sessions" for troubleshooting.

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/fgt12.jpg width="400"/>

### Step 5.6: East-West firewall policy

Create a firewall policy to allow traffic between Spoke VMs. We do not need NAT to be enabled.

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/fgt13.jpg width="400"/>

## Section 6: Testing the deployment

### Step 6.1: Ingress test

Using floating Public IP that is assigned to FortiGate-A untrust port, try to reach out using specific ports (TCP/2244 and TCP/2245). 

SSH to Spoke1-VM:

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/test01.jpg width="600"/>

SSH to Spoke2-VM:

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/test02.jpg width="600"/>

Verification:

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/test03.jpg width="400"/> <img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/test04.jpg width="400"/>

Check FortiGate traffic logs (_Path: **Log & Report > Forward Traffic**_)

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/test05.jpg width="500"/>

### Step 6.2: Egress test

Try to ping Google DNS 8.8.8.8 from Spoke1-VM or Spoke2-VM

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/test06.jpg width="400"/>

You can also try curl command to reach www.fortinet.com

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/test07.jpg width="400"/>

Check FortiGate traffic logs (_Path: **Log & Report > Forward Traffic**_)

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/test08.jpg width="600"/>

### Step 6.3: East/West test

Try to reach Spoke2-VM from Spoke1-VM using SSH or Telnet to port TCP/22 as below.

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/test09.jpg width="300"/>

Check FortiGate traffic logs (_Path: **Log & Report > Forward Traffic**_)

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/test10.jpg width="600"/>

## Section 7: Destroy the lab

Access OCI Stacks service and destroy the template.

<img src=https://github.com/ozanoguz/fgt-oci-hol/blob/main/images/destroy.jpg width="500"/>

