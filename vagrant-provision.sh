#!/bin/sh

NEWHOSTNAME=t3

sed -i -e s/precise64/${NEWHOSTNAME}/ /etc/hostname
sed -i -e s/precise64/${NEWHOSTNAME}/ /etc/hosts
hostname ${NEWHOSTNAME}

apt-get update
apt-get -y dist-upgrade

apt-get -y install \
  avahi-daemon \
  build-essential \
  curl \
  emacs23-nox \
  git \
  python-dev \
  python-mode \
  python-pip \
  sqlite3 \
  tig \
  tmux

pip install virtualenvwrapper

VENV_DIRS="/home/vagrant/.virtualenvs"
mkdir -p ${VENV_DIRS}
chown -R vagrant.vagrant ${VENV_DIRS}

if ! grep -q virtualenvwrapper /home/vagrant/.bashrc; then
  cat > /home/vagrant/.bash_profile <<EOF
. /usr/local/bin/virtualenvwrapper.sh
export WORKON_HOME=\$HOME/.virtualenvs
EOF
  cat >> /home/vagrant/.bashrc <<EOF
. /usr/local/bin/virtualenvwrapper.sh
export WORKON_HOME=\$HOME/.virtualenvs
EOF
  chown vagrant.vagrant /home/vagrant/.bash*
fi

sudo -iu vagrant bash -c "
  . /usr/local/bin/virtualenvwrapper.sh;
  mkvirtualenv t3;
  cd /vagrant;
  setvirtualenvproject;
  pip install -r requirements.txt;
"

chown -R vagrant.vagrant ${VENV_DIRS}

cat > /home/vagrant/.virtualenvs/t3/bin/postactivate <<EOF
export DJANGO_SETTINGS_MODULE=t3.settings
alias da=django-admin.py
EOF

sudo -iu vagrant bash -c "
  . /usr/local/bin/virtualenvwrapper.sh;
  workon t3;
  django-admin.py syncdb --migrate --noinput;
  django-admin.py loaddata t3/fixtures/sample.yaml;
"
