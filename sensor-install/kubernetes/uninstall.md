---
description: Remove the Oligo sensor from your Kubernetes cluster.
icon: trash-can
---

# Uninstall

Follow the steps below to remove the Oligo sensor from your cluster. Choose the section that matches your installation method.

{% tabs %}
{% tab title="Operator" %}
{% stepper %}
{% step %}
## Remove the sensor custom resource

```bash
kubectl delete oligosensor oligo-sensor -n oligo
```
{% endstep %}

{% step %}
## Uninstall the Operator

```bash
helm uninstall oligo-operator -n oligo
```
{% endstep %}

{% step %}
## Clean up the namespace and secret

```bash
kubectl delete secret oligo-api-token -n oligo
kubectl delete namespace oligo
```
{% endstep %}
{% endstepper %}
{% endtab %}

{% tab title="Operatorless" %}
{% stepper %}
{% step %}
## Uninstall the sensor Helm release

```bash
helm uninstall oligo-sensor -n oligo
```
{% endstep %}

{% step %}
## Clean up the namespace and secret

```bash
kubectl delete secret oligo-api-token -n oligo
kubectl delete namespace oligo
```
{% endstep %}
{% endstepper %}
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Uninstalling the sensor stops all monitoring immediately. Historical data remains available in the Oligo Dashboard.
{% endhint %}

## Verify Removal

Confirm no Oligo resources remain:

```bash
kubectl get all -n oligo
```

The namespace should be empty or deleted.
