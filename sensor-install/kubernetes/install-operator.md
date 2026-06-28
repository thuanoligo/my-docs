---
description: Install the Oligo sensor using the Kubernetes Operator method.
icon: gears
---

# Install Sensor: K8s Operator

The Operator method deploys an Oligo controller that manages sensor lifecycle, upgrades, and configuration automatically. This is the **recommended** installation method.

{% hint style="info" %}
Ensure you have completed all [pre-requisites](pre-requisites.md) before proceeding.
{% endhint %}

## Install the Operator

{% stepper %}
{% step %}
## Install the Oligo Operator via Helm

```bash
helm install oligo-operator oligo/oligo-operator \
  --namespace oligo \
  --set apiTokenSecret=oligo-api-token
```
{% endstep %}

{% step %}
## Verify the Operator is running

```bash
kubectl get pods -n oligo
```

You should see the `oligo-operator` pod in a `Running` state.
{% endstep %}

{% step %}
## Deploy the sensor custom resource

```bash
kubectl apply -f - <<EOF
apiVersion: oligo.security/v1
kind: OligoSensor
metadata:
  name: oligo-sensor
  namespace: oligo
spec:
  mode: default
EOF
```
{% endstep %}

{% step %}
## Confirm sensors are deployed

```bash
kubectl get ds -n oligo
```

The Oligo DaemonSet should be running on all eligible nodes.
{% endstep %}
{% endstepper %}

## Configuration Options

Key Helm values you can customize:

| Parameter                | Default   | Description                        |
| ------------------------ | --------- | ---------------------------------- |
| `apiTokenSecret`         | —         | Name of the Kubernetes secret      |
| `sensor.resources.cpu`   | `100m`    | CPU request for sensor pods        |
| `sensor.resources.memory`| `128Mi`   | Memory request for sensor pods     |
| `sensor.nodeSelector`    | `{}`      | Node selector for sensor placement |

<details>
<summary>Full list of Helm values</summary>

TBD — complete Helm values reference.

</details>

## Verify Installation

After installation, confirm the sensor is reporting to the Oligo Dashboard:

1. Navigate to [Oligo Dashboard](https://app.oligo.security)
2. Go to **Sensors** in the left sidebar
3. Verify your cluster and nodes appear with a **Connected** status

{% hint style="warning" %}
It may take up to 5 minutes for sensors to appear in the dashboard after installation.
{% endhint %}
