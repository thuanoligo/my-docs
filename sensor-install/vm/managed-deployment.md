---
description: Install the Oligo sensor using the managed deployment method.
icon: wand-magic-sparkles
---

# Managed Deployment

In a Managed deployment, the Oligo platform handles sensor installation, upgrades, and configuration remotely. After initial setup, sensors receive updates automatically.

{% hint style="info" %}
Ensure you have completed all [pre-requisites](pre-requisites.md) before proceeding.
{% endhint %}

## Install the Sensor

{% stepper %}
{% step %}
## Run the managed installer

Execute the one-liner installer with your API token:

```bash
curl -sSL https://install.oligo.security | sudo bash -s -- \
  --token <YOUR_API_TOKEN>
```
{% endstep %}

{% step %}
## Verify the sensor is running

```bash
sudo systemctl status oligo-sensor
```

The service should show `active (running)`.
{% endstep %}

{% step %}
## Confirm connectivity in the dashboard

1. Navigate to [Oligo Dashboard](https://app.oligo.security)
2. Go to **Sensors** in the left sidebar
3. Verify the VM appears with a **Connected** status
{% endstep %}
{% endstepper %}

## How Managed Updates Work

With managed deployment:

* The Oligo platform pushes sensor updates automatically
* No manual intervention is required for version upgrades
* Rollbacks are handled by the platform if an update fails
* Update schedules can be configured in the dashboard under **Settings > Sensor Updates**

## Configuration

The managed sensor reads its configuration from the Oligo backend. To customize behavior:

1. Navigate to **Sensors > Configuration** in the dashboard
2. Adjust settings for individual VMs or groups
3. Changes are applied automatically on the next sensor check-in

<details>
<summary>Local configuration overrides</summary>

For advanced use cases, you can set local overrides in `/etc/oligo/sensor.yaml`. Local overrides take precedence over remote configuration.

```yaml
# /etc/oligo/sensor.yaml
log_level: debug
```

{% hint style="warning" %}
Local overrides may be reset during managed updates. Use the dashboard for persistent configuration.
{% endhint %}

</details>

## Uninstall

To remove the managed sensor:

```bash
sudo /opt/oligo/bin/oligo-sensor uninstall
```
