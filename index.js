var Botkit = require('botkit');
var Ansible = require('node-ansible');
var controller = Botkit.slackbot({debug:false});

var bot = controller.spawn({
  token: process.env.token
}).startRTM();
/*
controller.hears(['^workshop'],'direct_message,direct_mention,mention', function(bot, message) {
  // default behavior, post as the bot user
  console.log(message);
  bot.whisper(message, 'Booo! This message is ephemeral and private to you')
});
*/

var playbook = new Ansible.Playbook().playbook('./openshift-aws-setup/teardown-playbook');
playbook.inventory('./openshift_inventory.cfg' );
playbook.user('ec2-user');
playbook.exec();
playbook.on('stdout', function(data) { console.log(data.toString()); });
playbook.on('stderr', function(data) { console.log(data.toString()); });