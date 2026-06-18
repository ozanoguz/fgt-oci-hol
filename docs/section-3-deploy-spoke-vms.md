## Section 3: Deploy Spoke-VMs for testing

### Step 3.1: Create Ubuntu instance

Click _**Create**_ on _**Compute > Instances**_

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/11.spokevm01.jpg)

Give a name to spoke-VM using group Student-ID# (example: Student25-Spoke1-VM)

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/12.spokevm02.jpg)

Under "Image and shape" section select _Canonical Ubuntu 22.04" image for Spoke1-VMs.

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/13.spokevm03.jpg) ![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/14.spokevm04a.jpg)

Under "Primary VNIC Configuration" section, select related VCN and subnets as follows. **Remove "Automatically assign public IPV4 address" check, since we will not use it."**

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/15.spokevm05a2.JPG)

Under "Add SSH keys" section, download private key that we'll use later to login spoke-VMs.

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/16.spokevm06a.JPG)

Click "Create" to deploy Spoke1-VM.

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/17.spokevm07a.JPG)

**Repeat steps 3.1 for Spoke2-VM to deploy another Ubuntu-VM in Spoke2 VCN.**

Before proceeding, make sure all VMs are in running state.

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/20.spokevm07_1.jpg)