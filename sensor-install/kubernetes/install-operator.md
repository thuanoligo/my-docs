---
description: Install the Oligo sensor using the Kubernetes Operator method.
icon: gears
---

# Install Sensor: K8s Operator

Oligo provides an installation package that includes all the files needed to install in your clusters. If you haven't received the package, contact your account manager.

Oligo runs on Kubernetes and provides a [Helm](https://helm.sh/) package that you can install in minutes.

## Install Sensor operator

**Before you begin:**

* Complete the following checklist:
  * [System requirements](requirements.md)
  * [Pre-installation configurations](pre-requisites.md)

Your account manager should provide you with the `operator-values.yaml` file. If you don't have the file, contact your account manager.

{% stepper %}
{% step %}
### Set the cluster name

In the `operator-values.yaml` file, set the value of `clusterName`.

{% hint style="warning" %}
This needs to be a unique name for each operator deployment.
{% endhint %}

```yaml
controllerManager:
  clusterName: "my-cluster-name"
```
{% endstep %}

{% step %}
### Create a namespace

Create a [namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) for the Oligo deployment.

```shell
kubectl create namespace oligo
```
{% endstep %}

{% step %}
### Add the Oligo Helm repository

Run the following commands to [add](https://helm.sh/docs/helm/helm_repo_add/) the Oligo Helm chart repository.

```shell
helm repo add oligo-helm-repo https://oligocybersecurity.github.io/helm-chart-repo
helm repo update
helm search repo oligo-helm-repo
```
{% endstep %}

{% step %}
### Install Oligo

```shell
helm install oligo-operator oligo-helm-repo/oligo-operator -f operator-values.yaml -n oligo
```

Expected output:

```shell
NAME: operator
LAST DEPLOYED: Tue Mar 28
NAMESPACE: oligo
STATUS: deployed
REVISION: 1
TEST SUITE: None
```

The Oligo operator queries backend services and fetches the deployment configuration. Synchronization can take a few minutes. After that, Oligo Sensor pods deploy to the same namespace as the operator.
{% endstep %}

{% step %}
### Validate that Oligo is running

After about 30 seconds, you should see the Sensor DaemonSet installed along with the scanner and collector deployments. Run the following commands:

```shell
kubectl get ds -n oligo
kubectl get deploy -n oligo
```

Expected output:

```shell
NAME            DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
oligo-sensor    1         1         1       1            1           <none>          112s

NAME                   READY   UP-TO-DATE   AVAILABLE   AGE
oligo-collector        1/1     1            1           3m18s
oligo-scanner-watchdog 1/1     1            1           3m18s
```
{% endstep %}
{% endstepper %}

## Upgrade Sensor operator

{% stepper %}
{% step %}
### Update the version

Update the `tag` in the `operator-values.yaml` file to the target version.
{% endstep %}

{% step %}
### Run the upgrade

```bash
helm repo update
helm upgrade oligo-operator oligo-helm-repo/oligo-operator --version <DESIRED_VERSION> -n oligo
```
{% endstep %}

{% step %}
### Verify the upgrade

```bash
kubectl get pods -n oligo
```
{% endstep %}
{% endstepper %}

{% hint style="warning" %}
If you experience issues during the upgrade, it may be because you are upgrading legacy operator versions. In these cases, uninstall the Sensor and reinstall using this installation guide.
{% endhint %}

## Uninstall Sensor operator

{% hint style="info" %}
See the [Uninstall](uninstall.md) page for complete uninstallation instructions.
{% endhint %}
