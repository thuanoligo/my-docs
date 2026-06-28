---
description: Pre-installation configurations for deploying the Oligo sensor on Kubernetes.
icon: clipboard-check
---

# Pre-requisites

You will receive a configuration file from Oligo before you start the installation.

* **Kubernetes**: `operator-values.yaml` – External [values](https://helm.sh/docs/chart_template_guide/values_files/) configuration file that will be provided to the Helm chart during installation.

Specific configurations must be set in the `values.yaml` file.

When you install Oligo sensors, bandwidth use varies by environment. Factors include the number of applications, sensors, processes, and monitored requests. If you need guidance for your setup, contact your Oligo account team.

* A single monitored process uses about **0.1 to 0.125 MB per hour**.
* A typical sensor that monitors a standard number of processes uses about **1.9 MB per hour**.
* When logs, telemetry, metrics, and process information are included, each sensor uses about **2.5 MB per hour**.

To view the complete Helm chart: [https://github.com/OligoCyberSecurity/helm-chart-repo](https://github.com/OligoCyberSecurity/helm-chart-repo)

## Required settings

### Configure Kubernetes cluster

In the cluster global section, fill out the following field:

* `clusterName`

{% hint style="info" %}
* The cluster name should consist only of lowercase letters and use dashes (`-`) as separators.
* The cluster name should be in quotes.
{% endhint %}

**Example:**

```yaml
controllerManager:
  clusterName: "my-cluster-name"
```

## Optional settings

#### Resource limits

You can set resource limits for each Oligo component beyond the defaults. Kubernetes manages resource limit enforcement.

Example for raising the sensor memory limit to 2Gi and lowering the CPU to 1.5 cores:

```yaml
sensor:
  resources:
    limits:
      memory: 2Gi
      cpu: 1500m
```

Optional configuration variables can be edited in the `operator-values.yaml` file under the `sensorOverrides` section.

#### Allow or block namespaces

To monitor specific namespaces, configure the allow or block lists.

```yaml
sensorOverrides:
  common:
    # Namespaces to monitor.
    # If empty, all namespaces are monitored.
    # The lists are mutually exclusive; if both are set, only the allow list is used.
    namespacesToMonitor:
      allow: ["default", "kube-public", "kube-node-lease"]
      block: []
```

* The allow list takes priority over the block list.
* If both fields are empty, all namespaces are monitored.
* By default, the `kube-system` namespace is not monitored.
* Glob syntax is allowed in the allow list. For example, `*-oligo` matches any namespace ending with `-oligo`.

### Setting node selector

To install Oligo only on specific nodes, use the `nodeSelector` field:

```yaml
sensorOverrides:
  sensor:
    nodeSelector:
      os: linux
```

### Setting tolerations

Taints and tolerations control which nodes a pod can schedule on. Because the sensor is deployed as a DaemonSet, it should run on all nodes. If nodes have taints, the sensor won't deploy there unless matching tolerations are added.

We recommend deploying first. If you notice missing nodes, check taints using:

```bash
kubectl get nodes -o json | jq '.items[].spec.taints'
```

If taints exist, add the corresponding tolerations under `sensorOverrides` in your operator-values.yaml when using the operator deployment:

```yaml
sensorOverrides:
  sensor:
    tolerations:
      - key: "cpu"
        operator: "Equal"
        value: "amd64"
        effect: "NoSchedule"
```

Or place them directly under sensor-values.yaml when not using the operator:

```yaml
sensor:
  tolerations:
    - key: "cpu"
      operator: "Equal"
      value: "amd64"
      effect: "NoSchedule"
```

This ensures the sensor runs on all nodes, including those with taints.

---

For a full list of Helm chart variables, run:

```bash
helm show values oligo-helm-repo/oligo
```
