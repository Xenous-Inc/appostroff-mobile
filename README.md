# Appostorff Mobile
#### Access to fresh short stories wherever you are.


# Naming
## Methodology
We use [BEM naming methodology](https://ru.bem.info/methodology/naming-convention/) as our base, or rather [CamelCase style](https://ru.bem.info/methodology/naming-convention/#%D1%81%D1%82%D0%B8%D0%BB%D1%8C-camelcase).

## Usage
`blockName__elemName_modName_modValue`

### Names
For the `blockName` use name of **parent element** and for the `elemName` use name of **child element**.\
\
For example, if we have JSX structure like this
```
> View
    > Pressable
        > Image
        > Text
```
naming structure should be like this
```
> wrapper
    > wrapper__content
        > content__image
        > content__text
```

### Modifiers
Use modifiers to describe style properties, that should be applied only when some condition applies.\
\
List of examples (based on Button component)
- Style for case when component disabled `wrapper__content_state_disabled`
- Style for cases when component have contained mode `wrapper_mode_contained`

#### Code Example
```
<View 
    style={[
        styles.wrapper, 
        mode === 'contained' && styles.wrapper_mode_contained,
    ]}>
    <Pressable 
        style={[
            styles.wrapper__content,
            disabled && styles.wrapper__content_state_disabled,
        ]}>
        <Image style={styles.content__image} />
        <Text style={styles.content__text} >...</Text>
    </Pressable>
</View>
```

## Reserved Words
- `content` for the content block
- `wrapper` when we already have a `content` block and need to wrap it
- `content__header` for the header
- `content__body` for the body

