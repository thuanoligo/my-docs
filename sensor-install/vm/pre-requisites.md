---
description: Steps to complete before installing the Oligo sensor on a VM.
icon: clipboard-check
---

# Pre-requisites

Complete the following checklist before proceeding with the Oligo sensor installation on your virtual machines.

## System Requirements

| Resource       | Minimum              |
| -------------- | -------------------- |
| OS             | Linux (Ubuntu 20.04+, Debian 11+, RHEL 8+, Amazon Linux 2) |
| Architecture   | x86_64, arm64        |
| CPU            | TBD                  |
| Memory         | TBD                  |
| Disk           | TBD                  |

## Network Requirements

The Oligo sensor requires outbound connectivity to the Oligo backend:

| Endpoint              | Port | Protocol | Purpose            |
| --------------------- | ---- | -------- | ------------------ |
| `*.oligo.security`    | 443  | HTTPS    | Sensor telemetry   |

{% hint style="warning" %}
If the VM uses a network proxy or firewall, ensure the endpoints above are allowlisted.
{% endhint %}

## Checklist

{% stepper %}
{% step %}
## Obtain your Oligo API token

Log in to the [Oligo Dashboard](https://app.oligo.security) and generate an API token under **Settings > API Tokens**.

{% hint style="danger" %}
Store your API token securely. It cannot be retrieved after creation.
{% endhint %}
{% endstep %}

{% step %}
## Verify root or sudo access

The sensor installation requires elevated privileges:

```bash
sudo -v
```
{% endstep %}

{% step %}
## Verify outbound connectivity

```bash
curl -s -o /dev/null -w "%{http_code}" https://api.oligo.security/health
```

A `200` response confirms connectivity.
{% endstep %}
{% endstepper %}

{% hint style="success" %}
Once all steps are complete, proceed to [Managed Deployment](managed-deployment.md) or [Non-Managed Deployment](non-managed-deployment.md).
{% endhint %}
