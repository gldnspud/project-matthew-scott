# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"


Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|


  # Box
  # ===

  config.vm.box = "precise64"
  config.vm.box_url = "http://files.vagrantup.com/precise64_vmware.box"

  # Use this instead if using VirtualBox:
  # config.vm.box_url = "http://files.vagrantup.com/precise64.box"


  # SSH
  # ===

  config.ssh.forward_agent = true


  # Synced folders
  # ==============

  # Use NFS to avoid VMware file corruption and VirtualBox slowness.
  config.vm.synced_folder ".", "/vagrant", nfs: true


  # Provider-specific configuration
  # ===============================

  config.vm.provider :virtualbox do |vb|
    # Use VBoxManage to customize the VM. For example to change memory:
    vb.customize ["modifyvm", :id, "--memory", "1024"]
  end

  config.vm.provider "vmware_fusion" do |v|
    v.vmx["memsize"] = "1024"
  end


  # Provisioning
  # ============

  config.vm.provision "shell", path: "vagrant-provision.sh"


end
