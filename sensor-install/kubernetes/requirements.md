---
description: System and cluster requirements for deploying Oligo sensors on Kubernetes.
icon: list-check
---

# Requirements

Before installing the Oligo sensor on Kubernetes, verify that your environment meets the following requirements.

## Supported Kubernetes Versions

| Version | Support Status |
| ------- | -------------- |
| 1.25+   | Supported      |

{% hint style="info" %}
Oligo supports major managed Kubernetes platforms including EKS, GKE, and AKS.
{% endhint %}

## Node Requirements

| Resource  | Minimum        |
| --------- | -------------- |
| CPU       | TBD            |
| Memory    | TBD            |
| Disk      | TBD            |
| OS        | Linux (x86_64, arm64) |

## Network Requirements

The Oligo sensor requires outbound connectivity to the Oligo backend. Ensure the following endpoints are accessible from your cluster:

| Endpoint              | Port | Protocol | Purpose            |
| --------------------- | ---- | -------- | ------------------ |
| `*.oligo.security`    | 443  | HTTPS    | Sensor telemetry   |

{% hint style="warning" %}
If your cluster uses a network proxy or firewall, ensure the endpoints above are allowlisted.
{% endhint %}

## Permissions

The sensor requires the following Kubernetes RBAC permissions:

* Read access to pod and namespace metadata
* Ability to run as a DaemonSet (Operator mode) or sidecar (Operatorless mode)

<details>
<summary>Detailed RBAC requirements</summary>

TBD — detailed ClusterRole and ClusterRoleBinding specifications will be listed here.

</details>
