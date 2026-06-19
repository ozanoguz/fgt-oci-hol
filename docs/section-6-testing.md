# Section 6: Testing the deployment

## Step 6.1: Ingress test

Using the floating public IP assigned to the FortiGate-A untrust port, try to reach the spoke VMs using the specific ports configured earlier:

```text
TCP/2244
TCP/2245
```

SSH to Spoke1-VM:

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/test01.jpg" alt="SSH to Spoke1 VM" width="600">
</p>

SSH to Spoke2-VM:

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/test02.jpg" alt="SSH to Spoke2 VM" width="600">
</p>

Verification:

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/test03.jpg" alt="Verify Spoke1 VM SSH Access" width="400">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/test04.jpg" alt="Verify Spoke2 VM SSH Access" width="400">
</p>

Check the FortiGate traffic logs.

Navigation path:

```text
Log & Report > Forward Traffic
```

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/test05.jpg" alt="FortiGate Ingress Traffic Logs" width="600">
</p>

---

## Step 6.2: Egress test

Try to ping Google DNS `8.8.8.8` from Spoke1-VM or Spoke2-VM.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/test06.jpg" alt="Ping Google DNS from Spoke VM" width="400">
</p>

You can also use the `curl` command to reach `www.fortinet.com`.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/test07.jpg" alt="Test Internet Access with Curl" width="400">
</p>

Check the FortiGate traffic logs.

Navigation path:

```text
Log & Report > Forward Traffic
```

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/test08.jpg" alt="FortiGate Egress Traffic Logs" width="600">
</p>

---

## Step 6.3: East/West test

Try to reach Spoke2-VM from Spoke1-VM using SSH or Telnet to TCP port `22`, as shown below.

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/test09.jpg" alt="Test East-West Traffic Between Spoke VMs" width="300">
</p>

Check the FortiGate traffic logs.

Navigation path:

```text
Log & Report > Forward Traffic
```

<p align="center">
  <img src="https://raw.githubusercontent.com/ozanoguz/fgt-oci-hol/main/images/test10.jpg" alt="FortiGate East-West Traffic Logs" width="600">
</p>

---

## Checkpoint

Before continuing, confirm that:

- SSH access to Spoke1-VM works through TCP port `2244`.
- SSH access to Spoke2-VM works through TCP port `2245`.
- Ingress traffic appears in the FortiGate forward traffic logs.
- Spoke1-VM or Spoke2-VM can reach `8.8.8.8`.
- The `curl` test to `www.fortinet.com` succeeds.
- Egress traffic appears in the FortiGate forward traffic logs.
- Spoke1-VM can reach Spoke2-VM using TCP port `22`.
- East-West traffic appears in the FortiGate forward traffic logs.