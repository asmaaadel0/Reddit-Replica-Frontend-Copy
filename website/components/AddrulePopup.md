# AddrulePopup

## Props

<!-- @vuese:AddrulePopup:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|subredditName|return subreddit name|`String`|`true`|-|
|ruleNameEdit|return edited rule name|`String`|`true`|-|
|reportReasonEdit|return report reason edit|`String`|`true`|-|
|appliesToEdit|return applies to edit|`String`|`true`|posts and comments|
|descriptionEdit|return report description edit|`String`|`true`|-|
|ruleOrder|return rule order|`Number`|`true`|0|
|ruleId|return rule id|`String`|`true`|-|
|edit|return if there is an edited rule|`Boolean`|`true`|false|

<!-- @vuese:AddrulePopup:props:end -->


## Events

<!-- @vuese:AddrulePopup:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|exit|Fire emit to close create community dialog|-|
|doneSuccessfully|-|-|
|clickedDelete|-|-|

<!-- @vuese:AddrulePopup:events:end -->


## Methods

<!-- @vuese:AddrulePopup:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|hideAddRule|Hide dialog|no argument|
|chooseType|Set chosen applied to type (posts and comments, posts only, comments only)|index to indicate chosen type|
|updateChoosen|update chosen applied to type (posts and comments, posts only, comments only)|no argument|
|charCount|Decrease characters count while typing|no argument|
|submitRule|handle submit adding rule|no argument|
|updateRule|handle update rule|no argument|
|deleteRule|handle delete rule|no argument|

<!-- @vuese:AddrulePopup:methods:end -->

