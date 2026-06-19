# Section 5: Configure FortiGate routing and firewall policy

## Step 5.1: Prepare FortiGate

SSH to both cluster members using their public IP addresses.

The SSH login password is the VM's OCID for the first login. You can copy the OCID from the OCI Console. After logging in, set a new password that you can remember.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/fgt01.jpg" alt="FortiGate public IP addresses" width="300">
</p>

---

## Step 5.2: FortiGate GUI and static route

Log in to the FortiGate management GUI using the public IP address:

```text
https://<FortiGate-Public-IP>
```

Click **Later** on the following screen:

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/fgt05.jpg" alt="FortiGate setup screen" width="400">
</p>

We need to add routes for the Spoke VCN CIDRs and use the first IP address of the port2 subnet as the gateway IP. This is required for return traffic.

Navigation path:

```text
Network > Static Routes
```

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/fgt06.jpg" alt="Create FortiGate static route" width="400">
</p>

You should see both static routes on the active FortiGate member as shown below:

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/fgt07.jpg" alt="FortiGate static routes" width="600">
</p>

---

## Step 5.3: Ingress firewall policy

Create a VIP using the Spoke VM private IP address.

The following example shows traffic arriving from outside on TCP port `2244`. FortiGate maps this traffic to the SSH port of Spoke1-VM. FortiGate therefore performs destination IP and destination port NAT.

Navigation path:

```text
Policy & Objects > Virtual IPs > Create New
```

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/fgt08.jpg" alt="Create VIP for Spoke1 VM SSH access" width="600">
</p>

Create another VIP for Spoke2-VM using TCP port `2245`.

Then create an ingress firewall policy using the VIP objects created above.

For troubleshooting, set **Log Allowed Traffic** to **All Sessions**.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/fgt09.jpg" alt="Create ingress firewall policy" width="500">
</p>

---

## Step 5.4: Egress firewall policy

Create host address objects on FortiGate for Spoke1-VM and Spoke2-VM.

Navigation path:

```text
Policy & Objects > Addresses > Create New
```

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/fgt10.jpg" alt="Create address object for Spoke1 VM" width="400">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/fgt11.jpg" alt="Create address object for Spoke2 VM" width="400">
</p>

Using these address objects, create an egress firewall policy to allow Internet access from the spoke VMs.

For troubleshooting, set **Log Allowed Traffic** to **All Sessions**.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/fgt12.jpg" alt="Create egress firewall policy" width="500">
</p>

---

## Step 5.5: East-West firewall policy

Create a firewall policy to allow traffic between the spoke VMs.

NAT does not need to be enabled for this policy.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/fgt13.jpg" alt="Create east-west firewall policy" width="500">
</p>

---

## Checkpoint

Before continuing, confirm that:

- You can access the FortiGate management GUI.
- Static routes exist for both Spoke VCN CIDRs.
- A VIP exists for Spoke1-VM using TCP port `2244`.
- A VIP exists for Spoke2-VM using TCP port `2245`.
- The ingress firewall policy is configured.
- Host address objects exist for both spoke VMs.
- The egress firewall policy is configured.
- The east-west firewall policy is configured.
- NAT is disabled on the east-west firewall policy.