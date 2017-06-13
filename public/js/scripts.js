/* global instantsearch */

app({
  appId: 'FP9WZYG9KK',
  apiKey: '684ca6d753e316e196e7ac62d730629c',
  indexName: 'hooli'
});

function app(opts) {
  var search = instantsearch({
    appId: opts.appId,
    apiKey: opts.apiKey,
    indexName: opts.indexName,
    urlSync: true
  });

  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#search-input',
      placeholder: '  Site search'
    })
  );

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      hitsPerPage: 15,
      templates: {
        item: getTemplate('hit'),
        empty: getTemplate('no-results')
      }
   })
);

  search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#industry',
    attributeName: 'industry',
    operator: 'or',
    showMore: 'true',
    limit: 30,
    templates: {
      header: 'Industry'
    }
  })
);

search.addWidget(
instantsearch.widgets.refinementList({
  container: '#application_names',
  attributeName: 'application_names',
  operator: 'or',
  showMore: 'true',
  limit: 30,
  templates: {
    header: 'Installed Apps'
  }
})
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#themeframework',
    attributeName: 'themeframework',
    operator: 'or',
    limit: 10,
    templates: {
      header: 'Framework'
    }
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#blueprint-theme',
    attributeName: 'blueprint_template',
    operator: 'or',
    showMore: 'true',
    limit: 15,
    templates: {
      header: 'Blueprint Theme'
    }
  })
);

  search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#plan',
    attributeName: 'subscription_plan_group',
    operator: 'or',
    limit: 10,
    templates: {
      header: 'Plan'
    }
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#tags-facet',
    attributeName: 'tags',
    operator: 'or',
    showMore: 'true',
    limit: 30,
    templates: {
      header: 'Tags'
    }
  })
);
  search.addWidget(
    instantsearch.widgets.pagination({
      container: '#pagination',
      scrollTo: '#search-input'
    })
  );


  search.start();
}

function getTemplate(templateName) {
  return document.querySelector('#' + templateName + '-template').innerHTML;
}

function getHeader(title) {
  return '<h5>' + title + '</h5>';
}


$(document).ready(function () {

    var client = algoliasearch('FP9WZYG9KK', '6f8534882bd2383dc21b40b1458091df', {
        protocol: 'https:'
    });
    var index = client.initIndex('hooli');

    $(document).on('click', '.upvote', function () {
        id = $(this).attr('id').replace('.', '\\.');
        id1 = $(this).attr('id');
        updatedVoteCount = Number($('#votecount-' + id).text()) + 1;

        index.partialUpdateObject({
            votes: {
                value: 1,
                _operation: 'Increment'
            },
            objectID: id1
        }, function (err, content) {
            console.log(content);
        });

        $('div#votecount-' + id).text(updatedVoteCount);
    });

    $(document).on('click', '.downvote', function () {
        id = $(this).attr('id').replace('.', '\\.');
        id1 = $(this).attr('id');
        updatedVoteCount = Number($('div#votecount-' + id).text()) - 1;
        index.partialUpdateObject({
            votes: {
                value: 1,
                _operation: 'Decrement'
            },
            objectID: id1
        }, function (err, content) {
            console.log(content);
        });

        $('div#votecount-' + id).text(updatedVoteCount);
    });

    availableTags = ['fortune1000', 'faceted search', 'bronto', 'jewelry', 'beauty', 'athletic clothing', 'home', 'auto parts and accessories', 'industrial supplies', 'tv and video', 'gourmet foods', 'gifts', 'books', 'b2b', 'facebook shops', 'apparel accessories', 'nutrition', ' vitamins and supplements', 'exercise and fitness', 'furniture', 'car/vehicle electronics', 'janitorial', 'camera photo and video', 'beverage', 'collectibles', 'music', 'ir1000', 'subscriptions', 'saleswarp', 'shoes', 'mens grooming', 'outdoor clothing', 'kitchen and dining', 'auto tools and equipment', 'lab and scientific', 'home audio and theater', 'specialty foods', 'military', 'movies and video', 'design award', 'pinterest', 'womens apparel', 'personal care', 'hunting', 'bedding and bath', 'tires and wheels', 'safety', 'cell phones and accessories', 'restaurant merchandise', 'antiques', 'innovation award', 'ebay', 'mens apparel', 'health care', 'fishing', 'appliances', 'motorcycle and powersports', 'food service', 'headphones', 'restaurant ordering', 'big brand', 'amazon', 'girls apparel', 'homes supplies', 'fan shop', 'patio', ' lawn and garden', 'vehicles', 'material handling', 'video games', 'wine', 'games', 'square', 'boys apparel', 'baby care', 'leisure sports and game room', 'fine art', 'heavy equipment', 'personal audio', 'beer', 'handmade', 'kids', 'sports collectibles', 'arts', ' crafts and sewing', 'manufacturing and metalworking', 'musical instruments', 'vapor', 'party supplies', 'baby', 'baseball', 'pet supplies', 'packing and shipping', 'computers', 'meats', 'wedding', 'luggage', 'football', 'home improvement', 'light equipment and tools', 'computer accessories', 'cheese', 'travel', 'running', 'golf', 'home hardware', 'fashion', 'basketball', 'tools and power tools', 'wholesale', 'software', 'chocolate', 'flowers', 'watches', 'hockey', 'kitchen and bath fixtures', 'services - industrial', 'handbags and wallets', 'cycling', 'lamps and light fixtures', 'services - home', 'printers and ink', 'grocery', 'hobbies', 'soccer', 'office and school supplies', 'climbing', 'ski and winter sports', 'camping and hiking', 'sports medicine', 'lacrosse', 'home decor', 'tennis', 'pool and spa', 'gymnastics', 'stationery', 'volleyball', 'housewares', 'equestrian', 'sports training', 'scooters skateboards and skates', 'water sports', 'customer groups', 'digital products', 'complex products', 'make/year/model', 'product configurator', 'kitting/bundling', 'netsuite', 'sap', 'listrak', 'quickbooks', 'shipperhq', 'complex checkout', 'multi-lingual', 'CMS agnostic'];
    $(document).on('click', '.view-apps', function () {
      appId = $(this).attr('id').replace(/\./g, '\\.');
      unescapedId = $(this).attr('id');
      currentAppId = '#installed-apps' + appId;
      $(currentAppId).toggleClass('apps-visible animated');
      $(currentAppId).toggleClass('apps-hidden animated zoomInDown');

      currentApps = $('#current-apps' + appId).text();
      splitApps = currentApps.split(",");

      if ($(this).attr('data-created') != 'true') {
      appTaggle = new Taggle('installed-apps' + unescapedId, {
        tags: splitApps,
        allowedTags: splitApps,
        additionalTagClasses: 'app'
      });
      $(this).attr('data-created', 'true');
    };
    });
    $(document).on('click', '.add-tag', function () {
        tagId = $(this).attr('id').replace(/\./g, '\\.');
        tagId1 = $(this).attr('id');
        encodedId = encodeURI(tagId);
        currentId = '#tagslist' + tagId;
        console.log(currentId);
        
        $(currentId).toggleClass('tags-visible animated');
        $(currentId).toggleClass('tags-hidden animated zoomInDown');

        currentTags = $('#current-tags' + tagId).text();
        splitTags = currentTags.split(",");

        if ($(this).attr('data-created') != 'true') {
        taggle = new Taggle('tagslist' + tagId1, {
            tags: splitTags,
            allowedTags: availableTags,
            onBeforeTagRemove: function (event, tag) {
                return confirm('You really wanna remove the' + tag + ' tag?');
            },

            onTagRemove: function (event, tag) {
                index.partialUpdateObject({
                    tags: {
                        value: tag,
                        _operation: 'Remove'
                    },
                    objectID: tagId1
                }, function (err, content) {
                    console.log(content);
                });
            },
            onTagAdd: function (event, tag) {
                index.partialUpdateObject({
                    tags: {
                        value: tag,
                        _operation: 'Add'
                    },
                    objectID: tagId1
                }, function (err, content) {
                    console.log(content);
                });

            }
        });
      };
        //dont remember why this was added originally
        //$(".taggle_input").parent().css("width", "22%");

        $(".taggle_input").autocomplete({
            source: availableTags,
            select: function (event, data) {
                event.preventDefault();
                //Add the tag if user clicks
                if (event.which === 1) {
                    taggle.add(data.item.value);
                }
            }
        });
        $("input.taggle_input.ui-autocomplete-input").attr("placeholder", "Enter tags");
        if (currentTags == "") {
            $(currentId + ' ' + '.taggle_list .taggle').hide();
        }
                $(this).attr('data-created', 'true');
    });
});
$(document).ready(function () {
    $("#tag-hintlist ul").html(availableTags.map(function (value) {
        return ('<li>' + value + '</li>');
    }).join(""));

    tagbox = new jBox('Tooltip', {
        content: $('#tag-hintlist'),
        trigger: 'click',
        position: {
            x: 'center',
            y: 'center'
        },
        target: $(window),
        addClass: 'ui-widget-content',
        adjustPosition: true,
        adjustTracker: true,
        draggable: 'title',
        closeOnEsc: true,
        closeButton: true,
        title: "These are available tags"
    });

    $('#tag-tooltip').click(function () {
        tagbox.toggle();
    });
    $('.jBox-closeButton').click(function () {
        tagbox.hide();
    });
});
