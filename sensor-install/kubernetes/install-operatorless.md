---
description: Install the Oligo sensor using the Operatorless (Helm-only) method.
icon: cube
---

# Install Sensor: K8s Operatorless

The Operatorless method deploys the Oligo sensor directly via Helm without a managing controller. Use this method when CRDs are restricted or you prefer direct Helm management.

{% hint style="info" %}
Ensure you have completed all [pre-requisites](pre-requisites.md) before proceeding.
{% endhint %}

## Install the Sensor

{% stepper %}
{% step %}
## Install the Oligo sensor via Helm

```bash
helm install oligo-sensor oligo/oligo-sensor \
  --namespace oligo \
  --set apiTokenSecret=oligo-api-token \
  --set mode=operatorless
```
{% endstep %}

{% step %}
## Verify the sensor DaemonSet is running

```bash
kubectl get ds -n oligo
kubectl get pods -n oligo
```

All sensor pods should be in a `Running` state across your cluster nodes.
{% endstep %}
{% endstepper %}

## Configuration Options

Key Helm values you can customize:

| Parameter                | Default   | Description                        |
| ------------------------ | --------- | ---------------------------------- |
| `apiTokenSecret`         | —         | Name of the Kubernetes secret      |
| `mode`                   | `operatorless` | Deployment mode                |
| `sensor.resources.cpu`   | `100m`    | CPU request for sensor pods        |
| `sensor.resources.memory`| `128Mi`   | Memory request for sensor pods     |
| `sensor.nodeSelector`    | `{}`      | Node selector for sensor placement |

<details>
<summary>Full list of Helm values</summary>

TBD — complete Helm values reference.

</details>

## Upgrading

To upgrade the sensor to a new version:

```bash
helm repo update
helm upgrade oligo-sensor oligo/oligo-sensor \
  --namespace oligo \
  --reuse-values
```

## Verify Installation

After installation, confirm the sensor is reporting to the Oligo Dashboard:

1. Navigate to [Oligo Dashboard](https://app.oligo.security)
2. Go to **Sensors** in the left sidebar
3. Verify your cluster and nodes appear with a **Connected** status
