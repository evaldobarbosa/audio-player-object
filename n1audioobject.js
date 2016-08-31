var N1AudioObject = function(id,callback) {
	this.src = null;
	this.changeStatusCallback = null;

	var self = this;

	if ( callback !== undefined ) {
		this.changeStatusCallback = callback;
	}	

	this.player = document.querySelector(id);

	if ( this.player == undefined ) {
		throw 'Audio object not found';
	}

	this.player.onplay = function() {
        if ( self.callbackExists() ) {
        	self.changeStatusCallback(true);
        }
    };

    this.player.onpause = function() {
        if ( self.callbackExists() ) {
        	self.changeStatusCallback(false);
        }
    };
}

N1AudioObject.prototype.isPlaying = function() {
	return !this.player.paused;
};

N1AudioObject.prototype.callbackExists = function() {
	return ( this.changeStatusCallback !== null );
}

N1AudioObject.prototype.setSource = function(url) {
	this.src = url;

	return this;
};

N1AudioObject.prototype.load = function() {
	this.player.src = this.src;

	return this;
};

N1AudioObject.prototype.play = function() {
	this.load();
	this.player.play();
};

N1AudioObject.prototype.pause = function() {
	this.player.pause();
};

N1AudioObject.prototype.stop = function() {
	this.pause();
	this.player.src = '';
	this.load();
};
