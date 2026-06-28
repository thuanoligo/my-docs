---
description: Install the Oligo sensor on on-premises Kubernetes clusters.
icon: server
---

# Install: On-Prem K8s

This guide covers additional configuration needed when deploying the Oligo sensor on on-premises (self-managed) Kubernetes clusters that may have restricted internet access or custom networking.

{% hint style="info" %}
Ensure you have completed all [pre-requisites](pre-requisites.md) before proceeding.
{% endhint %}

## Differences from Cloud-Managed K8s

On-prem clusters typically require additional configuration for:

* **Image registry access** — pulling Oligo container images through a private registry or mirror
* **Outbound connectivity** — routing sensor traffic through a proxy
* **TLS certificates** — custom CA bundles for corporate proxies

## Installation

{% stepper %}
{% step %}
## Configure a private image registry (if required)

If your cluster cannot pull images from public registries, mirror the Oligo images to your internal registry:

```bash
# Pull and re-tag the Oligo images
docker pull oligo/sensor:latest
docker tag oligo/sensor:latest your-registry.internal/oligo/sensor:latest
docker push your-registry.internal/oligo/sensor:latest
```
{% endstep %}

{% step %}
## Configure proxy settings (if required)

If outbound traffic must go through a proxy, set the proxy environment variables in the Helm values:

```yaml
# custom-values.yaml
env:
  HTTP_PROXY: "http://proxy.internal:8080"
  HTTPS_PROXY: "http://proxy.internal:8080"
  NO_PROXY: "10.0.0.0/8,172.16.0.0/12,.internal"
```
{% endstep %}

{% step %}
## Configure custom CA certificates (if required)

For environments with TLS-inspecting proxies:

```yaml
# custom-values.yaml
customCA:
  enabled: true
  secretName: corporate-ca-bundle
```
{% endstep %}

{% step %}
## Install the sensor

Use the Operator or Operatorless method with your custom values:

```bash
helm install oligo-operator oligo/oligo-operator \
  --namespace oligo \
  --set apiTokenSecret=oligo-api-token \
  --set image.registry=your-registry.internal \
  -f custom-values.yaml
```
{% endstep %}

{% step %}
## Verify connectivity

Confirm the sensor can reach the Oligo backend:

```bash
kubectl logs -l app=oligo-sensor -n oligo | grep "connected"
```
{% endstep %}
{% endstepper %}

{% hint style="warning" %}
If using an air-gapped environment with no outbound internet access, contact [Oligo Support](mailto:support@oligo.security) for offline deployment options.
{% endhint %}
