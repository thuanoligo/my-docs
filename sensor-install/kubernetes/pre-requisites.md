---
description: Steps to complete before installing the Oligo sensor on Kubernetes.
icon: clipboard-check
---

# Pre-requisites

Complete the following checklist before proceeding with the Oligo sensor installation.

{% stepper %}
{% step %}
## Obtain your Oligo API token

Log in to the [Oligo Dashboard](https://app.oligo.security) and generate an API token under **Settings > API Tokens**.

{% hint style="danger" %}
Store your API token securely. It cannot be retrieved after creation.
{% endhint %}
{% endstep %}

{% step %}
## Install Helm

Helm 3.x is required for both Operator and Operatorless installations.

```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
helm version
```
{% endstep %}

{% step %}
## Verify cluster access

Confirm you have `kubectl` access to the target cluster with sufficient permissions.

```bash
kubectl auth can-i create namespace
kubectl auth can-i create clusterrole
kubectl auth can-i create clusterrolebinding
```

All commands should return `yes`.
{% endstep %}

{% step %}
## Add the Oligo Helm repository

```bash
helm repo add oligo https://charts.oligo.security
helm repo update
```
{% endstep %}

{% step %}
## Create the Oligo namespace

```bash
kubectl create namespace oligo
```
{% endstep %}

{% step %}
## Create the API token secret

```bash
kubectl create secret generic oligo-api-token \
  --from-literal=token=<YOUR_API_TOKEN> \
  -n oligo
```
{% endstep %}
{% endstepper %}

{% hint style="success" %}
Once all steps are complete, proceed to [Install Sensor: K8s Operator](install-operator.md) or [Install Sensor: K8s Operatorless](install-operatorless.md).
{% endhint %}
