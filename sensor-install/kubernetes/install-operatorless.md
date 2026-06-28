---
description: Install the Oligo sensor using the Operatorless (Helm-only) method.
icon: cube
---

# Install Sensor: K8s Operatorless

Install Oligo Sensor using an installation package without installing the Sensor operator. In other words, you are responsible for upgrading and managing the sensor.

## Operatorless installation overview

Oligo provides an installation package that includes all the files you need to install Oligo on your target clusters. If you haven't received your installation package, contact your Oligo account manager.

This guide explains how to install the Sensor in Kubernetes without the Oligo Operator. Use this method when you prefer a non-Operator installation. In this case, you are responsible for upgrading and managing the Sensor.

{% hint style="info" %}
Complete the [system requirements](requirements.md) and [pre-installation configurations](pre-requisites.md) before you continue.
{% endhint %}

## Install Sensor operatorless

{% stepper %}
{% step %}
### Create a namespace

Create a namespace for the Oligo deployment.

```shell
kubectl create namespace oligo
```
{% endstep %}

{% step %}
### Add the Oligo Helm repository

Run the following commands to add the Oligo Helm chart repository:

```shell
helm repo add oligo-helm-repo https://oligocybersecurity.github.io/helm-chart-repo
helm repo update
helm search repo oligo-helm-repo
```
{% endstep %}

{% step %}
### Install Oligo

Install Oligo using the Helm chart and the provided `sensor-values.yaml` file. Replace `<desired-version>` with the version supplied in your package:

```shell
helm install oligo oligo-helm-repo/oligo --version <desired-version> -f sensor-values.yaml -n oligo
```
{% endstep %}

{% step %}
### Validate that Oligo is running

After about 30 seconds, you should see the Sensor DaemonSet along with the scanner and collector deployments. Run:

```shell
kubectl get ds -n oligo
kubectl get deploy -n oligo
```

Example output:

```shell
NAME                          DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
oligo-sensor                  1         1         1       1            1           <none>          112s

NAME                          READY   UP-TO-DATE   AVAILABLE   AGE
oligo-collector               1/1     1            1           3m18s
oligo-scanner-watchdog        1/1     1            1           3m18s
```
{% endstep %}
{% endstepper %}
