# Section 2: Deploy A/P FortiGate cluster

## Step 2.1: Deploy FortiGate cluster using Terraform

Click the link below using the same browser you used to log in to OCI.

The link redirects you to the Oracle Resource Manager Stacks service, which uses Terraform behind the scenes.

| Create Lab Environment |
|:--:|
| [![Deploy to Oracle Cloud](https://oci-resourcemanager-plugin.plugins.oci.oraclecloud.com/latest/deploy-to-oracle-cloud.svg)](https://cloud.oracle.com/resourcemanager/stacks/create?zipUrl=https://github.com/ozanoguz/fgt-oci-hol/releases/download/hol/FGT_A-P_NewVCN_v8.0.0_BYOL.zip) |

The template creates the following infrastructure:

- 3 VCNs:
  - 2 Spoke VCNs
  - 1 FortiGate VCN
- Required subnets, route tables, and security lists
- 2 FortiGate-VM instances using FortiOS 7.0.12 BYOL images

On the **Stacks** management page, select:

```text
I have reviewed and accept the Oracle Terms of Use
```

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/05.stacks_01.jpg" alt="Accept Oracle Terms of Use" width="700">
</p>

Make sure your assigned student compartment is selected, then click **Next** at the bottom-left corner.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/06.stacks_02.jpg" alt="Select Student Compartment" width="700">
</p>

On the next page, define a **PREFIX** and paste the specific compartment OCID value for your deployment.

Each group uses a different student ID and compartment so that the resources for each study group can be identified easily.

::: danger Important
This step is mandatory. If the prefix or compartment OCID is not configured correctly, the deployment will fail.
:::

After entering the required values, click **Next** at the bottom-left corner, then click **Create**.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/07.stacks_03.jpg" alt="Configure Prefix and Compartment OCID" width="700">
</p>

Enter the FortiFlex token values provided for both FortiGate VMs.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/06.fortiflex.JPG" alt="Enter FortiFlex Token Values" width="700">
</p>

The deployment takes a few minutes to complete.

When the deployment is complete, the job status is shown as:

```text
SUCCEEDED
```

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/08.stacks_04.jpg" alt="OCI Stack Deployment Succeeded" width="700">
</p>

---

## Step 2.2: Verify deployment

The FortiGate VMs should be deployed and shown as **Running** under:

```text
Compute > Instances
```

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/09.verify01.jpg" alt="Verify FortiGate VMs Are Running" width="700">
</p>

There should be three VCNs deployed for the lab.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/10.verify02.jpg" alt="Verify Three Lab VCNs" width="700">
</p>