(function($) {
    var e = window.console ? console.log : alert;
	
    $.fn.popUpForm = function(options) {
        // Выделяем место для присоединения формы
		$("#popUpHide").length || $('<div id="popUpHide" />').appendTo('body').css('display','none');

		// Контейнер ОБЯЗАТЕЛЕН
		if(!options.container) { alert('Требуется контейнер с опциями'); return; }
		
        // Опции и значения по умолчанию
        var defaults = {
            container   : '',
            modal		: true,
			resizeable	: false,
			width		: 440,
			title		: 'Форма вебсайта',
			beforeOpen  : function(container) {},
			onSuccess	: function(container) {},
			onError		: function(container) {}
        };
        var opts = $.extend({}, defaults, options);
		
		// "this" в каждом цикле ссылается на единственный элемент DOM
		// коллекции jQuery, с которой мы сейчас работаем
        this.each(function() {
			/* Нужно сохранить значение 'this' доступным для вызова $.load */
			var $this = $(this);
			
			/* Обрабатывать элемент будет только в случае, если это ссылка 
			 * и она имеет значение в атрибуте href
			 */

			if (!$this.is('a') || $this.attr('href') == '') { return ; }

			/* Для функции $.load() параметром является URL, за которым следует 
			 * селектор ID для части страницы, который будет обрабатываться
			 */
			var SRC = $this.attr('href') + ' ' + opts.container;
			
			/* Привязка события выполняется в возвратной функции в случае
			 * ошибки загрузки формы, или если пользователь нажал на ссылку до 
			 * момента полной готовности модального диалога
			 */
			var formDOM = $("<div />").load(SRC, function() {
				// Добавляем к странице
				$('#popUpHide').append(formDOM);
				
				// Создаем и сохраняем диалог 
				$(opts.container).dialog({
					autoOpen	: false,
					width		: opts.width,
					modal		: opts.modal,
					resizable	: opts.resizeable,
					title		: opts.title
				});
			  
				/* Останавливаем обычное подчинение формы. Операцию нужно выполнять после
				 * создания диалога, так как форма еще не существует для передачи ее обработчику события
				 */
				$(opts.container).bind('submit', function(e) {
					e.preventDefault();
					ajaxSubmit($this[0]);	
				});
				
				// Создаем привязку для ссылки переданной плагину
				$this.bind('click', function(e) {
					e.preventDefault();
					opts.beforeOpen.call($this[0], opts.container);
					$(opts.container).dialog('open');
				});	
			});
            
        });
		
		function ajaxSubmit(anchorObj) {
			console.log(anchorObj);
			var form 	= $(opts.container);
			var method 	= form.attr('method') || 'GET';                                                 
			
			$.ajax({
				type	: method,
				url		: form.attr('action'),
				data	: form.serialize(),
				success : function() {
					$(opts.container).dialog('close');
					opts.onSuccess.call(anchorObj, opts.container);	
				},
				error	: function() {
					opts.onError.call(anchorObj, opts.container);
				}
			});
		}
    }
})(jQuery);