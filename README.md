# Arkerfeldt API
API for Arkerfeldt CMS

## guide for prisma
### after edit schema
```bash
npx prisma generate
```

then,
```bash
npx prisma migrate save --experimental
npx prisma migrate up --experimental
```
