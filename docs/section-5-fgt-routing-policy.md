## Section 5: Configure FortiGate routing and firewall policy

### Step 5.1: Prepare FortiGate

SSH both cluster members using public IPs. **SSH login password is VM's OCID for the 1st time, which can be copied from OCI console.You can set any password you can remember.**

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/fgt01.jpg)

### Step 5.2: FortiGate GUI and static route

Login FortiGate management GUI using public IPs (`https://<FortiGate-Public-IP>`)

Click to "Later" on following screen:

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/fgt05.jpg)

We need to add Spoke-VCN CIDR routes and set port2-subnet's first IP address as gateway IP. This is done for return traffic. (_Path: **Network > Static Routes**_)

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/fgt06.jpg)

You should see both static routes on active FortiGate member as below:

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/fgt07.jpg)

### Step 5.3: Ingress firewall policy

Create a VIP (Virtual IP Address) using Spoke-VM IPs. Following example is showing traffic coming from outside (North/South) to TCP/2244 will be mapped to Spoke1-VMs SSH port, meaning destination IP and port NAT will be handled by FortiGate. (_Path: **Policy & Objects > Virtual IPs  > Create New**_)

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/fgt08.jpg)

Create another VIP for Spoke2-VM using TCP/2245.

Then, we will create a ingress firewall policy using objects above. You can set "Log Allowed Traffic" option to "All Sessions" for troubleshooting.

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/fgt09.jpg)

### Step 5.4: Egress firewall policy

Create host objects on FortiGate for Spoke1-VM and Spoke2-VM. (_Path: **Policy & Objects > Addresses  > Create New**_)

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/fgt10.jpg) ![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/fgt11.jpg)

Using those objects, create an Egress Policy for allowing Internet access (South/North). You can set "Log Allowed Traffic" option to "All Sessions" for troubleshooting.

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/fgt12.jpg)

### Step 5.5: East-West firewall policy

Create a firewall policy to allow traffic between Spoke VMs. We do not need NAT to be enabled.

![image](https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/fgt13.jpg)