---
description: System and cluster requirements for deploying Oligo sensors on Kubernetes.
icon: list-check
---

# Requirements

Before you install Sensor Oligo in your Kubernetes environment, confirm that your system meets the requirements set out in this article.

### Requirements overview

* The Kubernetes user must have permission to create resources in the target cluster or clusters.
* Verify that your Kubernetes platform and architecture are supported.
* Helm must be installed locally to deploy the Sensor.

### Programming languages supported

{% hint style="info" %}
Contact your Oligo representative for the latest list of supported programming languages.
{% endhint %}

### Network access

The Kubernetes cluster must allow outbound HTTPS connectivity to the following domains and ports.

| Domain                         | Port | Purpose                            |
| ------------------------------ | ---- | ---------------------------------- |
| `gateway.oligo.security`       | 443  | Send information to the Oligo platform |
| `registry-1.docker.io`         | 443  | Pull Docker images                 |
| `index.docker.io`              | 443  | Pull Docker images                 |
| `oligocybersecurity.github.io` | 443  | Pull Helm chart                    |
| `gcr.io`                       | 443  | Pull Docker images                 |

### Machine requirements

#### Memory

| Component | Request | Limit  | Deployment                |
| --------- | ------- | ------ | ------------------------- |
| Sensor    | 1 Gi    | 1 Gi   | Per node (DaemonSet)      |
| Scanner   | 256 Mi  | 512 Mi | Per cluster (Deployment)  |
| Collector | 512 Mi  | 512 Mi | Per cluster (Deployment)  |

#### Ephemeral storage

| Component | Request | Limit  | Deployment                |
| --------- | ------- | ------ | ------------------------- |
| Sensor    | 300 Mi  | 5 Gi   | Per node (DaemonSet)      |
| Scanner   | -       | 100 Mi | Per cluster (Deployment)  |
| Collector | -       | 100 Mi | Per cluster (Deployment)  |

#### CPU

| Component | Request | Limit  | Deployment                |
| --------- | ------- | ------ | ------------------------- |
| Sensor    | 300m    | 2000m  | Per node (DaemonSet)      |
| Scanner   | 100m    | 500m   | Per cluster (Deployment)  |
| Collector | 500m    | 500m   | Per cluster (Deployment)  |

## Kubernetes and platforms

#### Kubernetes and Helm versions

| Component  | Version         |
| ---------- | --------------- |
| Kubernetes | 1.19 or later   |
| Helm       | 3.10 or later   |

#### Platforms

The supported platforms are listed in the table.

| Platform   | Support                                     |
| ---------- | ------------------------------------------- |
| Amazon EKS | 1.20 and later                              |
| Azure AKS  | 1.20 and later                              |
| Google GKE | 1.20 and later                              |
| K3D        | Supported — ask CSM for installation package |
| Minikube   | Supported — ask CSM for installation package |
| Kind       | Supported — ask CSM for installation package |

{% hint style="info" %}
When installing on K3D, enable the following flags:

```bash
k3d cluster create --host-pid-mode -v /etc/machine-id:/etc/machine-id --k3s-arg "--disable=traefik@server:0"
```
{% endhint %}

### Deployment

Oligo supports the following deployment methods.

* ArgoCD
* Helm
* Terraform

### Security context

Oligo Sensor interacts with the Linux kernel to load the eBPF program and collect data. To load an eBPF program, Oligo Sensor requires privileged access and the `SYS_ADMIN` capability.

### Kubernetes role-based access control (RBAC)

Oligo Scanner interacts with the Kubernetes API to discover cluster state at runtime. For this purpose, it requires **read-only** (get, watch, and list) permissions for the following resources: Pods, Namespaces, Nodes, Services, Deployments, StatefulSets, DaemonSets, ReplicaSets, Ingresses, Gateways, and HTTPRoutes.
