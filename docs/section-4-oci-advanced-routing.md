# Section 4: OCI advanced routing

## Step 4.1: Create DRG

Type **dynamic routing gateway** to the search box on top:

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/18.routing1.jpg" alt="Search Dynamic Routing Gateway" width="700">
</p>

Make sure the specific compartment has been selected, then select **Create dynamic routing gateway**.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/19.routing2.jpg" alt="Create Dynamic Routing Gateway" width="500">
</p>

Set the DRG name with your group student-ID as below. Make sure the specific compartment has been selected.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/19.routing2a.jpg" alt="Set DRG Name" width="500">
</p>

---

## Step 4.2: DRG VCN attachments

We need to attach Spoke and FortiGate VCNs to the DRG to enable communication.

In the DRG configuration screen, select **VCN attachments** on the left.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/20.spokevm07_1.jpg" alt="DRG VCN Attachments" width="700">
</p>

Configure FortiGate-VCN attachment as below:

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/21.routing3.jpg" alt="FortiGate VCN Attachment" width="400">
</p>

Configure Spoke1-VCN attachment as below:

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/22.routing4.jpg" alt="Spoke1 VCN Attachment" width="500">
</p>

Configure Spoke2-VCN attachment as below:

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/23.routing5.jpg" alt="Spoke2 VCN Attachment" width="400">
</p>

Verify that you have 3 successful attachments:

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/24.routing6.jpg" alt="Verify DRG VCN Attachments" width="400">
</p>

---

## Step 4.3: Spoke subnet routing

This step is required for East-West and South-North inspection.

Under **Virtual cloud networks > Spoke1-VCN > Routing**, select **Student##-spoke1-routetable**.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/25.routing7.jpg" alt="Select Spoke1 Route Table" width="500">
</p>

Edit the `0.0.0.0/0` route to point to the DRG.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/26.routing8.jpg" alt="Edit Spoke1 Default Route to DRG" width="800">
</p>

Follow the same step to configure the Spoke2-VCN route table.

---

## Step 4.4: FortiGate Trust subnet routing

Configure route table **Student##-trust-routetable** as below.

You can navigate there using this path:

```text
Networking > Virtual cloud networks > Student##-VCN > Route tables
```

This is for return traffic.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/27.routing9.jpg" alt="Configure FortiGate Trust Route Table" width="500">
</p>

---

## Step 4.5: DRG route tables

Create two separate route tables in the DRG management screen as below.

Navigation path:

```text
Networking > Virtual cloud networks > Customer connectivity > Dynamic routing gateways > Student##-DRG > DRG route tables > Create DRG route table
```

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/28.routing10.jpg" alt="Create DRG Route Tables" width="500">
</p>

Associate DRG route tables with VCN attachments.

FortiGate VCN attachment should use **Student##-Hub-Route-Table**.

Spoke VCN attachments should use **Student##-Spoke-Route-Table**.

Navigation path:

```text
Networking > Virtual cloud networks > Customer connectivity > Dynamic routing gateways > Student##-DRG > VCN attachments > Edit
```

FortiGate Hub VCN attachment route-table configuration:

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/29.routing11.jpg" alt="FortiGate Hub VCN Attachment Route Table Configuration" width="400">
</p>

Spoke VCN attachment route-table configuration should be configured for both Spoke-VCN attachments:

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/30.routing12.jpg" alt="Spoke VCN Attachment Route Table Configuration" width="700">
</p>

VCN attachment route-table configuration should be like this:

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/31.routing13.jpg" alt="Verify VCN Attachment Route Table Configuration" width="700">
</p>

---

## Step 4.6: Import route distributions

We need to create route distributions for DRG hub route tables, so required prefixes will be announced into the route table for connectivity.

First, create an import route distribution for the Hub DRG route table to allow spoke VCN CIDRs to be announced as below.

Path:

```text
Networking > Customer connectivity > Dynamic routing gateways > Student##-DRG > Import route distributions > Create import route distribution
```

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/32.routing14.jpg" alt="Create Hub Import Route Distribution" width="700">
</p>

Use the import route distribution within the DRG hub route table.

Path:

```text
Networking > Customer connectivity > Dynamic routing gateways > Student##-DRG > DRG route tables > Edit
```

Hub DRG route table:

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/33.routing15.jpg" alt="Apply Import Route Distribution to Hub DRG Route Table" width="500">
</p>

Second, create another import route distribution for the Spoke DRG route table to allow the Hub VCN CIDR to be announced as below.

Path:

```text
Networking > Customer connectivity > Dynamic routing gateways > Student##-DRG > Import route distributions > Create import route distribution
```

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/34.routing16.jpg" alt="Create Spoke Import Route Distribution" width="500">
</p>

Use the import route distribution within the DRG spoke route table.

Path:

```text
Networking > Customer connectivity > Dynamic routing gateways > Student##-DRG > DRG route tables > Edit
```

Spoke DRG route table:

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/35.routing17.jpg" alt="Apply Import Route Distribution to Spoke DRG Route Table" width="700">
</p>

---

## Step 4.7: Hub VCN Ingress Route Table

We need to configure the FortiGate HA cluster floating IP as next-hop for handling routing by DRG.

To achieve this, first create a route table in the FortiGate Hub VCN and use that route table in Hub VCN DRG attachment ingress routing.

Create a route table in FortiGate Hub VCN as below. You can give a name using your group student-ID.

Navigation path:

```text
Networking > Virtual Cloud Networks > Student##-VCN > Route Tables > Create Route Table
```

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/36.routing18.jpg" alt="Create Hub VCN Ingress Route Table" width="500">
</p>

FortiGate A/P HA cluster floating IP can be found under FortiGate-VM VNIC configuration.

We will use the trust interface floating IP as the private IP target.

You can find the floating IP using this path:

```text
Instances > Student##-FortiGate-A > Attached VNICs > Trust-a interface > IPv4 addresses > Secondary IP
```

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/37.routing19.jpg" alt="Find FortiGate Trust Floating Private IP" width="700">
</p>

Route rules are pointing FortiGate floating IP to reach spoke VCN CIDRs and the Internet.

Navigation path:

```text
Networking > Virtual cloud networks > Student##-VCN > Route Tables > Student##-Ingress-Route-Table > Add Route Rules
```

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/38.routing20.jpg" alt="Add Hub VCN Ingress Route Rules" width="300">
</p>

Now, we will use this route table in Hub VCN DRG attachment configuration.

Path:

```text
Networking > Customer connectivity > Dynamic routing gateways > Student##-DRG > VCN attachments > Edit Hub VCN attachment
```

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/39.routing21.jpg" alt="Apply Ingress Route Table to Hub VCN DRG Attachment" width="500">
</p>

---

## Checkpoint

Before continuing, confirm that:

- The DRG has been created.
- FortiGate VCN is attached to the DRG.
- Spoke1 VCN is attached to the DRG.
- Spoke2 VCN is attached to the DRG.
- Spoke subnet route tables point to the DRG.
- FortiGate trust subnet routing is configured.
- DRG route tables are created and associated with the correct VCN attachments.
- Import route distributions are configured.
- Hub VCN ingress route table points traffic to the FortiGate floating private IP.