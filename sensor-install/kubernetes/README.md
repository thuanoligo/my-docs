---
description: Install and manage Oligo sensors on Kubernetes clusters.
icon: ship
---

# Kubernetes

Oligo supports Kubernetes deployments through two installation methods: the **K8s Operator** and **Operatorless** mode. Choose the method that best fits your cluster environment and operational preferences.

{% tabs %}
{% tab title="Operator" %}
The Operator method deploys an Oligo controller that manages sensor lifecycle automatically. This is the **recommended** approach for most environments.

[Get started with K8s Operator](install-operator.md)
{% endtab %}

{% tab title="Operatorless" %}
The Operatorless method uses Helm to deploy sensors directly without a managing controller. This is suited for environments where custom resource definitions (CRDs) are restricted.

[Get started with K8s Operatorless](install-operatorless.md)
{% endtab %}
{% endtabs %}

## Pages in This Section

<table data-view="cards">
    <thead>
        <tr>
            <th>Title</th>
            <th data-card-target data-type="content-ref">Target</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Requirements</td>
            <td><a href="requirements.md">Requirements</a></td>
        </tr>
        <tr>
            <td>Pre-requisites</td>
            <td><a href="pre-requisites.md">Pre-requisites</a></td>
        </tr>
        <tr>
            <td>Install: K8s Operator</td>
            <td><a href="install-operator.md">K8s Operator</a></td>
        </tr>
        <tr>
            <td>Install: K8s Operatorless</td>
            <td><a href="install-operatorless.md">K8s Operatorless</a></td>
        </tr>
        <tr>
            <td>Uninstall</td>
            <td><a href="uninstall.md">Uninstall</a></td>
        </tr>
        <tr>
            <td>Install: On-Prem K8s</td>
            <td><a href="install-on-prem.md">On-Prem K8s</a></td>
        </tr>
    </tbody>
</table>
