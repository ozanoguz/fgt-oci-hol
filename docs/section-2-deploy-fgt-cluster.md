# Section 2: Deploy FortiGate Cluster

In this section, you will deploy a FortiGate Active/Passive HA cluster on Oracle Cloud Infrastructure using OCI Resource Manager Stacks.

---

## Step 2.1: Open OCI Resource Manager Stacks

In the OCI Console, open the navigation menu and go to:

```text
Developer Services > Resource Manager > Stacks
```

Click **Create stack**.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/05.stacks_01.jpg" alt="OCI Resource Manager Stacks" width="700">
</p>

---

## Step 2.2: Upload the Stack Configuration

Upload the Terraform stack package provided for the lab.

Make sure the stack is created in your assigned compartment.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/06.stacks_02.jpg" alt="Upload Stack Configuration" width="500">
</p>

Review the stack information and continue.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/06.stacks_02a.jpg" alt="Review Stack Information" width="800">
</p>

---

## Step 2.3: Configure FortiFlex Licensing

Enter the FortiFlex token information provided by your instructor.

::: warning Important
Use only the FortiFlex tokens assigned to your student number.
:::

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/06.fortiflex.JPG" alt="FortiFlex Configuration" width="700">
</p>

---

## Step 2.4: Configure Stack Variables

Complete the required stack variables.

Use your assigned student number as the deployment prefix.

Example:

```text
Student25
```

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/07.stacks_03.jpg" alt="Configure Stack Variables" width="200">
</p>

Continue reviewing the variables.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/07.stacks_03a.JPG" alt="Review Stack Variables" width="700">
</p>

---

## Step 2.5: Create the Stack

Review the stack configuration and click **Create**.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/08.stacks_04.jpg" alt="Create Stack" width="500">
</p>

---

## Step 2.6: Apply the Stack

After the stack is created, run **Apply**.

Wait until the job status becomes:

```text
Succeeded
```

Do not continue until the apply job completes successfully.

---

## Step 2.7: Verify FortiGate Instances

Navigate to:

```text
Compute > Instances
```

Verify that both FortiGate instances are created and running.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/09.verify01.jpg" alt="Verify FortiGate Instances" width="800">
</p>

---

## Step 2.8: Verify Network Resources

Navigate to:

```text
Networking > Virtual Cloud Networks
```

Verify that the required VCNs and related network resources were created.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/10.verify02.jpg" alt="Verify OCI Network Resources" width="800">
</p>

---

## Checkpoint

Before continuing, confirm that:

- The Resource Manager stack was created.
- The apply job completed successfully.
- Both FortiGate instances are running.
- The required VCNs were created.
- You are still working in your assigned compartment.
