# Section 1: Login OCI and prepare for deployment

In this section, you will access the Oracle Cloud Infrastructure console, log in with your assigned credentials, select the correct identity domain, and change the OCI region to the lab region.

---

## Step 1.1: Access OCI console

First, log in to the OCI console using the link below. Username and password details will be provided during the lab session.

### Retrieve Your Lab Credentials

Your instructor will provide:

1. A shared **Lab Access Key**
2. Your assigned **Student ID**

Open the protected credential portal:

[Open Lab Credential Portal](https://sfvvdjstqiohvqhrrb2ihwmwcq0qzanh.lambda-url.eu-central-1.on.aws/)

Enter:

- The Lab Access Key provided by your instructor
- Your assigned Student ID, such as `student24`

The portal will display only the credentials assigned to your Student ID.

> [!WARNING]
> These credentials are temporary and are intended only for this hands-on lab.
> Do not share, photograph, or reuse them outside the lab session.

[Access OCI Console](https://cloud.oracle.com)

Use the following cloud account name, then click **Next**:

```text
fortinetoraclecloud1
```

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/01.login_oci_1.jpg" alt="OCI Cloud Account Name" width="500">
</p>

Choose the identity domain named **ksa_domain** from the dropdown list of domains.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/02.login_oci_2a.JPG" alt="Select OCI Identity Domain" width="500">
</p>

Enter your username and password, then click **Sign In**.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/03.login_oci_3a.JPG" alt="OCI Sign In" width="400">
</p>

---

## Step 1.2: Change Oracle region

Change the Oracle region to **Saudi Arabia West (Jeddah)** using the region dropdown menu in the top-right corner.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/docs/public/images/04.login_oci_4.jpg" alt="Change OCI Region" width="300">
</p>

---

## Checkpoint

Before continuing, confirm that:

- You are logged in to the OCI Console.
- The identity domain is set to **ksa_domain**.
- The region is set to **Saudi Arabia West (Jeddah)**.

Next section:

[Section 2: Deploy FortiGate Cluster](./section-2-deploy-fgt-cluster.md)