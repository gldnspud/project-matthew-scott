========================
Toptal Todo Tackler (T3)
========================


Quick Start
===========

Bootstrap::

    host$ vagrant up --provider vmware_fusion
                            (or vmware_workstation)

    host$ scp ~/.gitconfig vagrant@t3.local:.
    Password: vagrant

Connect via SSH::

    host$ vagrant ssh

If you like to use tmux::

    $ tmux   # or "tmux -a" if already running

Activate the virtualenv::

    $ workon t3

Run the Django dev server::

    $ da runserver 0.0.0.0:8000

Browse to `<http://t3.local:8000/>`__.


Description
===========

This project is based on the following requirements
provided during a `Toptal <http://toptal.com/>` screening process:

    Could you write me a todo list management web application where:

    - I can have my todo list displayed.

    - I can manipulate my list (add/remove/modify entries).

    - Assign priorities and due dates to the entries.

    - I can sort my entry lists using due date and priority.

    - I can mark an entry as completed.

    - Minimal UI/UX design is needed.

    - I need every client operation done using JavaScript, reloading the page is
      not an option.

    - Write a RESTful API which will allow a third-party application
      to trigger actions on your app (same actions available on the webpage).

    - You need to be able to pass credentials to both the webpage and the API.

    - As complementary to the last item,
      one should be able to create users in the system via an interface,
      probably a signup/register screen.


License and Copyright
=====================

Copyright (c) 2013 Elevencraft Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met: 

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer. 

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

The views and conclusions contained in the software and documentation are those
of the authors and should not be interpreted as representing official policies, 
either expressed or implied, of the FreeBSD Project.
