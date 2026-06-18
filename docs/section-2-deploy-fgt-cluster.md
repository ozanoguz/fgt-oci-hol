## Section 2: Deploy A/P FortiGate cluster

### Step 2.1: Deploy FortiGate cluster using Terraform

Click link below using same browser you used to login OCI. Link below will be redirecting to Oracle Stacks service, the service using Terraform behind the scenes. 

|Create Lab Environment|
|:-:|
|[![Deploy to Oracle Cloud](https://oci-resourcemanager-plugin.plugins.oci.oraclecloud.com/latest/deploy-to-oracle-cloud.svg)](https://cloud.oracle.com/resourcemanager/stacks/create?zipUrl=https://github.com/ozanoguz/fgt-oci-hol/releases/download/hol/FGT_A-P_NewVCN_v8.0.0_BYOL.zip)|

Template above is creating following infrastructure:

* 3x VCNs (2x Spoke VCNs and a FortiGate VCN)
* Required subnets, route tables and security lists
* 2x FortiGate-VM08 using FortiOS v7.0.12 BYOL image

In "Stacks" management page, check the *I have reviewed and accept the Oracle Terms of Use* box. 

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/05.stacks_01.jpg)

Make sure specific student compartment has been selected. then click **_Next_** at bottom left.

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/08.stacks_04.jpg)

On next page, you should define a _**PREFIX**_ and paste **specific compartment OCID value" for your deployment. Each group will use a different student-id and compartment, so we can easily find specific resources per study group. **This step is mandatory**. After this, you can click _**Next**_ on below left and then _**Create**_. **!!! IF THIS STEP IS NOT CONFIGURED CORRECTLY, DEPLOYMENT WILL FAIL !!!**

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/06.stacks_02a.jpg)

Enter the given FortiFlex token values for both FortiGate VMs.

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/06.fortiflex.JPG)

It will take couple of minutes for deployment to be completed. It will be shown as *SUCCEEDED* after completion.

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/07.stacks_03a.JPG)

### Step 2.2: Verify deployment

FortiGate-VMs should be deployed and shown as *running* under _**Compute > Instances **_

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/09.verify01.jpg)

There will be 3x VCNs deployed for lab as below:

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/10.verify02.jpg)