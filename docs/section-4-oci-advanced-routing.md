## Section 4: OCI advanced routing

### Step 4.1: Create DRG

Type "dynamic routing gateway" to search box on top:

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/18.routing1.jpg)

Make sure specific compartment has been selected, then select "Create dynamic routing gateway".

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/19.routing2a.jpg)

Set DRG name with your group student-ID as below. Make sure specific compartment has been selected.

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/21.routing3.jpg)

### Step 4.2: DRG VCN attachments

We need to attach Spoke and FortiGate VCNs to DRG to enable communication. 

In DRG configuration screen, select "VCN attachments" on left.

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/22.routing4a.JPG)

Configure FortiGate-VCN attachment as below:

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/23.routing5a.JPG)

Configure Spoke1-VCN attachment as below:

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/24.routing6a2.JPG)

Configure Spoke2-VCN attachment as below:

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/25.routing7a.JPG)

Verify that you have 3 successful attachments:

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/26.routing8.jpg)

### Step 4.3: Spoke subnet routing (for E/W and S/N inspection)

Under _"Virtual cloud networks > Spoke1-VCN > Routing"_, select **Student##-spoke1-routetable**

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/27.routing9a.JPG)

Edit 0.0.0.0/0 route to point DRG.

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/29.routing11a.JPG)

**Follow same step (4.3) to configure for Spoke2-VCN route table.**

### Step 4.4: FortiGate Trust subnet routing

Configure route table **Student##-trust-routetable** as below. You can navigate there using path _"Networking > Virtual cloud networks > Student##-VCN > Route tables"_. This is for return traffic.

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/31.routing13a.JPG)

### Step 4.5: DRG route tables

Create two separate route tables in DRG management screen as below. Navigation path: _Networking > Virtual cloud networks > Customer connectivity > Dynamic routing gateways > Student##-DRG >  DRG route tables > Create DRG route table_

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/32.routing14a.JPG)

Associate DRG route tables with VCN attachments. 

FortiGate VCN attachment should use _Student##-Hub-Route-Table_, Spoke VCN attachments should use _Student##-Spoke-Route-Table_. Navigation path: _Networking > Virtual cloud networks > Customer connectivity > Dynamic routing gateways >Student##-DRG > VCN attachments > Edit_

FortiGate Hub VCN attachment route-table configuration:

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/33.routing15a.JPG)

Spoke VCN attachment route-table configuration: (should be configured for both Spoke-VCN attachments)

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/34.routing16a.JPG)

VCN attachment route-table configuration should be like this:

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/35.routing17a.JPG)

### Step 4.6: Import route distributions

We need to create route distributions for DRG hub route tables, so required prefixes will be announced into route table for connectivity.

First, create an import route distribution for Hub DRG route table to allow spoke VCN CIDR's to be announced as below: (_Path: Networking > Customer connectivity > Dynamic routing gateways > Student##-DRG > Import route distributions > Create import route distribution_)

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/routing22a2.JPG)

Use import route distribution within DRG hub route table: (_Path: Networking > Customer connectivity > Dynamic routing gateways > Student##-DRG > DRG route tables > Edit_)

Hub DRG route table:

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/routing24a2.JPG)

Second, create another import route distribution for Spoke DRG route table to allow Hub VCN CIDR to be announced as below: (_Path: Networking > Customer connectivity > Dynamic routing gateways > Student##-DRG > Import route distributions > Create import route distribution_)

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/routing24b2.JPG)

Use import route distribution within DRG spoke route table: (_Path: Networking > Customer connectivity > Dynamic routing gateways > Student##-DRG > DRG route tables > Edit_)

Spoke DRG route table:

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/routing24c2.JPG)

### Step 4.7: Hub VCN Ingress Route Table

We need to configure FortiGate HA cluster floating IP as next-hop for handling routing by DRG. To achieve this, first let's create a route-table in FortiGate Hub VCN and use that route-table in Hub VCN DRG attachment ingress routing.

Create a route-table in FortiGate Hub VCN as below. You can give a name using your group student-ID. _Navigation Path: Networking > Virtual Cloud Networks > Student##-VCN > Route Tables > Create Route Table_

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/36.routing18a.JPG)

FortiGate A/P HA cluster floating IP can be found under FortiGate-VM vNIC configuration. We will use trust interface floating IP as private IP target.

You can find the floating IP using this path: _Instances > Student##-FortiGate-A > Attached VNICs > Trust-a interface > IPv4 addresses > Secondary IP (not primary)

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/38.routing20a.JPG)

Route rules are pointing FortiGate floating IP to reach out spoke VCN CIDRs and Internet. _Navigation Path: Networking > Virtual cloud networks > Student##-VCN > Route Tables > Student##-Ingress-Route-Table > Add Route Rules_

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/routing19a2.JPG)

Now, we will use this route-table in Hub VCN DRG attachment configuration. Path: _Networking > Customer connectivity > Dynamic routing gateways > Student##-DRG > VCN attachments > Edit Hub VCN attachment_

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/39.routing21a.JPG)