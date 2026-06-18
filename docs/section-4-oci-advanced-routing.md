# Section 4: OCI Advanced Routing

In this section, you will configure OCI routing so that spoke traffic is steered through the FortiGate Active/Passive HA cluster.

---

## Step 4.1: Review the Existing Network Topology

Before changing routing, review the deployed VCNs, subnets, and FortiGate interfaces.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/18.routing1.jpg" alt="Review Network Topology" width="700">
</p>

---

## Step 4.2: Create or Open the DRG

Open the OCI navigation menu and go to:

```text
Networking > Dynamic Routing Gateways
```

Create or open the DRG assigned to your lab.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/19.routing2.jpg" alt="Open Dynamic Routing Gateways" width="700">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/19.routing2a.jpg" alt="Create or Review DRG" width="700">
</p>

---

## Step 4.3: Attach VCNs to the DRG

Attach the following VCNs to the DRG:

- FortiGate hub VCN
- Spoke1 VCN
- Spoke2 VCN

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/20.spokevm07_1.jpg" alt="Attach VCNs to DRG" width="700">
</p>

---

## Step 4.4: Review DRG Attachments

Verify that all VCN attachments are created successfully.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/21.routing3.jpg" alt="Review DRG Attachments" width="700">
</p>

---

## Step 4.5: Configure Spoke Route Tables

Open the route table for the spoke subnet.

Add or update the default route so spoke traffic is sent to the DRG.

Use:

```text
Destination CIDR: 0.0.0.0/0
Target: DRG
```

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/22.routing4.jpg" alt="Configure Spoke Route Table" width="700">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/22.routing4a.JPG" alt="Review Spoke Route Table" width="700">
</p>

Repeat the same routing change for the second spoke VCN.

---

## Step 4.6: Configure Additional Spoke Routing

Review the route table configuration for the second spoke VCN.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/23.routing5.jpg" alt="Configure Second Spoke Route Table" width="700">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/23.routing5a.JPG" alt="Review Second Spoke Route Table" width="700">
</p>

---

## Step 4.7: Configure FortiGate Hub Routing

Open the FortiGate hub VCN route tables and configure the required routes for traffic inspection.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/24.routing6.jpg" alt="Configure FortiGate Hub Routing" width="700">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/24.routing6a.JPG" alt="Review Hub Route Table" width="700">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/24.routing6a2.JPG" alt="Review Additional Hub Route Table Settings" width="700">
</p>

---

## Step 4.8: Create DRG Route Tables

Create the required DRG route tables for hub and spoke routing.

Recommended naming example:

```text
Student25-Hub-DRG-Route-Table
Student25-Spoke-DRG-Route-Table
```

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/25.routing7.jpg" alt="Create DRG Route Tables" width="700">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/25.routing7a.JPG" alt="Review DRG Route Tables" width="700">
</p>

---

## Step 4.9: Associate DRG Route Tables

Associate the DRG route tables with the correct VCN attachments.

Use the hub route table for the FortiGate hub VCN attachment.

Use the spoke route table for the spoke VCN attachments.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/26.routing8.jpg" alt="Associate DRG Route Tables" width="700">
</p>

---

## Step 4.10: Configure Import Route Distributions

Create or update import route distributions for the DRG route tables.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/27.routing9.jpg" alt="Configure Import Route Distributions" width="700">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/27.routing9a.JPG" alt="Review Import Route Distribution" width="700">
</p>

---

## Step 4.11: Configure Route Distribution Statements

Add route distribution statements as required by the lab topology.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/28.routing10.jpg" alt="Configure Route Distribution Statements" width="700">
</p>

---

## Step 4.12: Apply Import Route Distribution to Route Tables

Apply the import route distribution to the correct DRG route table.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/29.routing11.jpg" alt="Apply Import Route Distribution" width="700">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/29.routing11a.JPG" alt="Review Applied Import Route Distribution" width="700">
</p>

---

## Step 4.13: Review DRG Route Rules

Review the imported and learned route rules in the DRG route tables.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/30.routing12.jpg" alt="Review DRG Route Rules" width="700">
</p>

---

## Step 4.14: Configure Hub VCN Ingress Routing

Open the Hub VCN ingress route table configuration.

Route traffic that must be inspected toward the FortiGate floating private IP.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/31.routing13.jpg" alt="Configure Hub VCN Ingress Routing" width="700">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/31.routing13a.JPG" alt="Review Hub VCN Ingress Routing" width="700">
</p>

---

## Step 4.15: Find the FortiGate Floating Private IP

Locate the FortiGate floating private IP address from the FortiGate VNIC information.

You will use this IP as the next hop for inspected traffic.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/32.routing14.jpg" alt="Find FortiGate Floating Private IP" width="700">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/32.routing14a.JPG" alt="Review FortiGate Floating Private IP" width="700">
</p>

---

## Step 4.16: Add Ingress Route Rules

Add the required ingress route rules pointing to the FortiGate floating private IP.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/33.routing15.jpg" alt="Add Ingress Route Rules" width="700">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/33.routing15a.JPG" alt="Review Ingress Route Rules" width="700">
</p>

---

## Step 4.17: Apply the Ingress Route Table

Apply the route table to the related DRG attachment ingress routing configuration.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/34.routing16.jpg" alt="Apply Ingress Route Table" width="700">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/34.routing16a.JPG" alt="Review Ingress Route Table Attachment" width="700">
</p>

---

## Step 4.18: Validate Route Table Associations

Review all route table associations and confirm that each attachment uses the correct DRG route table.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/35.routing17.jpg" alt="Validate Route Table Associations" width="700">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/35.routing17a.JPG" alt="Review Route Table Associations" width="700">
</p>

---

## Step 4.19: Validate Final Routing

Review the final routing configuration before moving to FortiGate policy configuration.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/36.routing18.jpg" alt="Validate Final Routing" width="700">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/36.routing18a.JPG" alt="Final Routing Review" width="700">
</p>

---

## Step 4.20: Confirm OCI Advanced Routing

Confirm that the required OCI route tables, DRG route tables, attachments, and distributions are complete.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/37.routing19.jpg" alt="Confirm OCI Advanced Routing" width="700">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/38.routing20.jpg" alt="Review Advanced Routing State" width="700">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/38.routing20a.JPG" alt="Review Advanced Routing Details" width="700">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/39.routing21.jpg" alt="Final Advanced Routing Validation" width="700">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/39.routing21a.JPG" alt="Final Advanced Routing Details" width="700">
</p>

---

## Checkpoint

Before continuing, confirm that:

- The DRG exists.
- FortiGate hub VCN is attached to the DRG.
- Spoke1 VCN is attached to the DRG.
- Spoke2 VCN is attached to the DRG.
- DRG route tables are configured.
- Import route distributions are configured.
- Hub VCN ingress routing points inspected traffic to the FortiGate floating private IP.
