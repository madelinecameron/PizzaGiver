# PizzaGiver

About
====

Written using express (node.js) along with MongoDB, Socket.IO and PizzaPI (an API for the Dominos site which is derived from a pre-existing node.js library), this site can be used to order pizza remotely for people on the internet without knowing their address of full name!

The site doesn't work! I try to pay for my friend's pizza but it won't complete!
====

Yes, as of 06/12/2015, the site **will not** order pizza. The reason for this is because I want to comply with PCI and not open myself up to lots of risk. If you look at the code between PizzaPI and PizzaGiver, you can see indicators of Stripe being implemented.

There are additional hurdles to cover before I will allow credit cards to be used on the site, for my own and buyer's sakes.

The first fully operational version will use gift cards instead of credit cards to avoid potentially fraudulent purchases, excessively large tips or otherwise undesirable activity.
