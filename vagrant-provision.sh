#!/bin/sh

NEWHOSTNAME=t3

set -i -e s/precise64/${NEWHOSTNAME}/ /etc/hostname
set -i -e s/precise64/${NEWHOSTNAME}/ /etc/hosts
hostname ${NEWHOSTNAME}

apt-get update
apt-get -y dist-upgrade

apt-get -y install \
  build-essential \
  emacs23-nox \
  python-dev \
  python-mode \
  python-pip \
  tmux

pip install virtualenvwrapper

VENV_DIRS="/home/vagrant/.virtualenvs"
mkdir -p ${VENV_DIRS}
chown vagrant.vagrant ${VENV_DIRS}

if ! grep -q virtualenvwrapper /home/vagrant/.bashrc; then
  cat > /home/vagrant/.bash_profile <<EOF
    . /usr/local/bin/virtualenvwrapper.sh
    export WORKON_HOME=$HOME/.virtualenvs
EOF
  cat >> /home/vagrant/.bashrc <<EOF
    . /usr/local/bin/virtualenvwrapper.sh
    export WORKON_HOME=$HOME/.virtualenvs
EOF
  chown vagrant.vagrant /home/vagrant/.bash*
fi

sudo -u vagrant bash -login -c "mkvirtualenv t3; cd /vagrant; setvirtualenvproject"
