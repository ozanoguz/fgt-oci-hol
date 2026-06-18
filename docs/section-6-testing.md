## Section 6: Testing the deployment

### Step 6.1: Ingress test

Using floating Public IP that is assigned to FortiGate-A untrust port, try to reach out using specific ports (TCP/2244 and TCP/2245). 

SSH to Spoke1-VM:

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/test01.jpg)

SSH to Spoke2-VM:

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/test02.jpg)

Verification:

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/test03.jpg) ![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/test04.jpg)

Check FortiGate traffic logs (_Path: **Log & Report > Forward Traffic**_)

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/test05.jpg)

### Step 6.2: Egress test

Try to ping Google DNS 8.8.8.8 from Spoke1-VM or Spoke2-VM

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/test06.jpg)

You can also try curl command to reach www.fortinet.com

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/test07.jpg)

Check FortiGate traffic logs (_Path: **Log & Report > Forward Traffic**_)

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/test08.jpg)

### Step 6.3: East/West test

Try to reach Spoke2-VM from Spoke1-VM using SSH or Telnet to port TCP/22 as below.

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/test09.jpg)

Check FortiGate traffic logs (_Path: **Log & Report > Forward Traffic**_)

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/test10.jpg)