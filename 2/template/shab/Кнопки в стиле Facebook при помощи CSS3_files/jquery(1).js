function get_domain(domain)
{
	arr = [];
	arr['def'] = ['cs.kolitat.com','i.kolitat.com','p.kolitat.com','nic.kolitat.com','reg.kolitat.com'];
	return arr[domain]!= undefined ? arr[domain][Math.floor(arr[domain].length*Math.random())] : arr['def'][Math.floor(arr['def'].length*Math.random())] ;
}