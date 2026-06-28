---
description: Install the Oligo sensor manually without managed updates.
icon: wrench
---

# Non-Managed Deployment

In a Non-Managed deployment, you install and manage the sensor lifecycle manually. Use this method for air-gapped environments, restricted networks, or when you prefer full control over sensor updates.

{% hint style="info" %}
Ensure you have completed all [pre-requisites](pre-requisites.md) before proceeding.
{% endhint %}

## Download the Sensor Package

Download the appropriate package for your OS and architecture:

{% tabs %}
{% tab title="Debian / Ubuntu" %}
```bash
curl -LO https://releases.oligo.security/sensor/oligo-sensor_latest_amd64.deb
```
{% endtab %}

{% tab title="RHEL / Amazon Linux" %}
```bash
curl -LO https://releases.oligo.security/sensor/oligo-sensor-latest.x86_64.rpm
```
{% endtab %}
{% endtabs %}

## Install the Sensor

{% stepper %}
{% step %}
## Install the package

{% tabs %}
{% tab title="Debian / Ubuntu" %}
```bash
sudo dpkg -i oligo-sensor_latest_amd64.deb
```
{% endtab %}

{% tab title="RHEL / Amazon Linux" %}
```bash
sudo rpm -i oligo-sensor-latest.x86_64.rpm
```
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
## Configure the API token

```bash
sudo oligo-sensor configure --token <YOUR_API_TOKEN>
```
{% endstep %}

{% step %}
## Start the sensor

```bash
sudo systemctl enable oligo-sensor
sudo systemctl start oligo-sensor
```
{% endstep %}

{% step %}
## Verify the sensor is running

```bash
sudo systemctl status oligo-sensor
```

The service should show `active (running)`.
{% endstep %}
{% endstepper %}

## Upgrading

With non-managed deployments, you are responsible for applying updates:

{% stepper %}
{% step %}
## Download the new version

Replace the package URL with the desired version.
{% endstep %}

{% step %}
## Install the update

{% tabs %}
{% tab title="Debian / Ubuntu" %}
```bash
sudo dpkg -i oligo-sensor_<version>_amd64.deb
```
{% endtab %}

{% tab title="RHEL / Amazon Linux" %}
```bash
sudo rpm -U oligo-sensor-<version>.x86_64.rpm
```
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
## Restart the sensor

```bash
sudo systemctl restart oligo-sensor
```
{% endstep %}
{% endstepper %}

## Uninstall

{% tabs %}
{% tab title="Debian / Ubuntu" %}
```bash
sudo systemctl stop oligo-sensor
sudo dpkg -r oligo-sensor
```
{% endtab %}

{% tab title="RHEL / Amazon Linux" %}
```bash
sudo systemctl stop oligo-sensor
sudo rpm -e oligo-sensor
```
{% endtab %}
{% endtabs %}
