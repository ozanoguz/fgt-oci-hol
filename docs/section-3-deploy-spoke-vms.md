# Section 3: Deploy Spoke VMs

In this section, you will deploy Ubuntu virtual machines in the spoke VCNs. These VMs will be used later for traffic testing through the FortiGate cluster.

---

## Step 3.1: Start Creating the First Spoke VM

In the OCI Console, go to:

```text
Compute > Instances
```

Click **Create instance**.

Use a name based on the Student ID you used in the credential portal.

Example:

```text
Student25-Spoke1-VM
```

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/11.spokevm01.jpg" alt="Create Spoke VM" width="700">
</p>

---

## Step 3.2: Select the Image and Shape

Select an Ubuntu image for the spoke VM.

Use the default or lab-provided shape unless your instructor gives different instructions.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/12.spokevm02.jpg" alt="Select Spoke VM Image and Shape" width="400">
</p>

---

## Step 3.3: Configure Networking

Select the correct VCN and subnet for the first spoke VM.

Make sure you select the Spoke1 VCN and related subnet.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/13.spokevm03.jpg" alt="Configure Spoke VM Networking" width="800">
</p>

---

## Step 3.4: Disable Public IPv4 Address

For the spoke VM, disable automatic public IPv4 assignment.

The spoke VM should use private connectivity through the FortiGate path.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/14.spokevm04.jpg" alt="Disable Public IPv4 Address" width="700">
</p>

Review the VNIC configuration.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/14.spokevm04a.jpg" alt="Review Spoke VM VNIC" width="700">
</p>

---

## Step 3.5: Configure SSH Keys

Download or upload the SSH key as instructed during the lab.

::: warning Important
Keep the private key file safe. You will use it later for SSH testing.
:::

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/15.spokevm05.jpg" alt="Configure SSH Keys" width="700">
</p>

Review the SSH key configuration.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/15.spokevm05a.jpg" alt="Review SSH Key Configuration" width="700">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/15.spokevm05a2.JPG" alt="Download SSH Private Key" width="700">
</p>

---

## Step 3.6: Create the First Spoke VM

Click **Create** and wait until the instance state becomes:

```text
Running
```

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/16.spokevm06.jpg" alt="Create First Spoke VM" width="700">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/16.spokevm06a.JPG" alt="First Spoke VM Running" width="700">
</p>

---

## Step 3.7: Create the Second Spoke VM

Repeat the same process for the second spoke VM.

Use a name based on the Student ID you used in the credential portal.

Example:

```text
Student25-Spoke2-VM
```

Select the Spoke2 VCN and related subnet.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/17.spokevm07.jpg" alt="Create Second Spoke VM" width="400">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/17.spokevm07a.JPG" alt="Second Spoke VM Running" width="400">
</p>

---

## Checkpoint

Before continuing, confirm that:

- Spoke1 VM is running.
- Spoke2 VM is running.
- Both VMs are in the correct spoke VCNs.
- Public IPv4 assignment is disabled where required.
- You have saved the SSH private key.
